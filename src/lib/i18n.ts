export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export const ui = {
  es: {
    sections: {
      about: 'Sobre mí',
      experience: 'Experiencia',
      education: 'Educación',
      skills: 'Habilidades',
      languages: 'Idiomas',
    },
    chips: {
      remote: 'Remoto',
      present: 'Actualidad',
    },
    contact: {
      email: 'Email',
      phone: 'Teléfono',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      cv: 'CV',
      lang: 'EN',
    },
    cmd: {
      hint: 'para abrir el menú',
      placeholder: 'Buscar acciones…',
      empty: 'Sin resultados',
      groups: { nav: 'Navegar', actions: 'Acciones', lang: 'Idioma' },
      goto: (s: string) => `Ir a ${s}`,
      copyEmail: 'Copiar email',
      downloadCv: 'Descargar CV (PDF)',
      switchLang: 'Cambiar a English',
      print: 'Imprimir',
    },
    hero: {
      role: 'Backend Developer',
      location: 'Buenos Aires, Argentina · UTC-3',
    },
  },
  en: {
    sections: {
      about: 'About',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
    },
    chips: {
      remote: 'Remote',
      present: 'Present',
    },
    contact: {
      email: 'Email',
      phone: 'Phone',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      cv: 'CV',
      lang: 'ES',
    },
    cmd: {
      hint: 'to open the command menu',
      placeholder: 'Search actions…',
      empty: 'No results',
      groups: { nav: 'Navigate', actions: 'Actions', lang: 'Language' },
      goto: (s: string) => `Go to ${s}`,
      copyEmail: 'Copy email',
      downloadCv: 'Download CV (PDF)',
      switchLang: 'Switch to Spanish',
      print: 'Print',
    },
    hero: {
      role: 'Backend Developer',
      location: 'Buenos Aires, Argentina · UTC-3',
    },
  },
} as const;

export const profile = {
  name: 'Esteban Nicolás Diaczun',
  email: 'estebandiaczun@gmail.com',
  github: 'https://github.com/estebandiaczunn',
  linkedin: 'https://www.linkedin.com/in/esteban-diaczun',
  cv: '/Esteban_N_Diaczun.pdf',
  avatar: '/avatar.svg',
};

export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith('/en') ? 'en' : 'es';
}

export function altLocalePath(pathname: string, current: Locale): string {
  if (current === 'es') return '/en';
  return pathname.replace(/^\/en\/?/, '/') || '/';
}
