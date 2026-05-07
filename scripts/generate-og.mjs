// Genera public/og.png (1200x630) — fondo dark con gradient sutil + acento.
// Pure Node, sin deps. Re-correr cuando cambien tokens de paleta:
//   node scripts/generate-og.mjs
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;

// Paleta (alineada con src/styles/global.css)
const TOP = [0x0a, 0x0a, 0x0c];
const BOTTOM = [0x14, 0x14, 0x1a];
const ACCENT = [0xff, 0xff, 0xff]; // strip suave

const lerp = (a, b, t) => Math.round(a + (b - a) * t);
const mix = (c, t) => [lerp(TOP[0], BOTTOM[0], t), lerp(TOP[1], BOTTOM[1], t), lerp(TOP[2], BOTTOM[2], t)];

// Buffer raw RGB 8-bit con un filter byte por scanline (0 = none).
const stride = 1 + W * 3;
const raw = Buffer.alloc(stride * H);
for (let y = 0; y < H; y++) {
  raw[y * stride] = 0;
  const t = y / (H - 1);
  const [r, g, b] = mix([], t);
  for (let x = 0; x < W; x++) {
    let R = r, G = g, B = b;

    // Vignette radial muy sutil.
    const dx = (x - W / 2) / (W / 2);
    const dy = (y - H / 2) / (H / 2);
    const d = Math.min(1, Math.sqrt(dx * dx + dy * dy));
    const v = 1 - d * 0.18;
    R = Math.round(R * v); G = Math.round(G * v); B = Math.round(B * v);

    // Strip de acento horizontal a 3/5 del alto, bien tenue.
    const stripY = Math.floor(H * 0.62);
    if (y === stripY || y === stripY + 1) {
      R = lerp(R, ACCENT[0], 0.08);
      G = lerp(G, ACCENT[1], 0.08);
      B = lerp(B, ACCENT[2], 0.08);
    }

    const o = y * stride + 1 + x * 3;
    raw[o] = R; raw[o + 1] = G; raw[o + 2] = B;
  }
}

// CRC32 (poly 0xEDB88320)
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
const crc32 = (buf) => {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
};

const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
};

const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;   // bit depth
ihdr[9] = 2;   // color type RGB
ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
const idat = deflateSync(raw, { level: 9 });
const png = Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);

const outPath = resolve(fileURLToPath(import.meta.url), '..', '..', 'public', 'og.png');
writeFileSync(outPath, png);
console.log(`wrote ${outPath} (${png.length} bytes, ${W}x${H})`);
