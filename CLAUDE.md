# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

This repo is a placeholder. Apart from `README.md`, `LICENSE`, and `.gitignore`, no source code, dependencies, or build configuration have been committed yet.

The intent (per `README.md`) is a CV rendered as a landing page. The `.gitignore` is the Next.js default (`.next/`, `out/`, `next-env.d.ts`, `/build`, `.vercel`), so a Next.js scaffold is the expected starting point — but nothing is wired up yet, so do not assume any framework, package manager, or tooling is in place until it appears in the tree.

## When scaffolding or making the first changes

- Confirm the framework choice with the user before running `create-next-app` or any other scaffolder; the `.gitignore` is a hint, not a commitment.
- Once a `package.json` exists, update this file with the actual `dev` / `build` / `lint` / `test` scripts and the chosen package manager.
- There is no architecture to summarize yet. Re-run `/init` after the initial scaffold lands so this file can describe the real structure instead of guesses.
