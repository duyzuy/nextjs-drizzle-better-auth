
# Next.js FSD Boilerplate

A production-ready Next.js boilerplate built with Feature-Sliced Design (FSD), TypeScript, React Query, Zustand, and modern development tooling.

---

## Features

* Next.js App Router
* TypeScript
* Feature-Sliced Design (FSD)
* Zustand
* TanStack Query
* Server Actions
* Authentication foundation
* ESLint + Biome
* Husky + lint-staged
* Path aliases

---

## Tech Stack

| Category         		| Technology     	|
| ---------------- 		| -------------- 	|
| Framework        		| Next.js        	|
| Language         		| TypeScript     	|
| State Management 		| Zustand        	|
| Server State     		| TanStack Query 	|
| Styling          		| Tailwind CSS   	|
| Linting & Format 		| Biome          	|
| Architect Boundaries 	| Eslint Boundaries |
| UI kit           		| Shadcn         	|

---

## Project Structure

```text
src/
├── app/
├── features/
├── entities/
├── widgets/
├── shared/
└── infrastructure/
```

For a detailed explanation, see:

* [Folder Structure](./docs/folder-structure.md)

---

## Getting Started

### Prerequisites

* Node.js >= 24
* pnpm >= 10

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
pnpm start
```

---

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm format
pnpm type-check
```

---

## Architecture

This project follows Feature-Sliced Design (FSD).

Layer dependency rules:

```text
app
 ↓
pages
 ↓
widgets
 ↓
features
 ↓
entities
 ↓
shared
```

See:

* [Architecture Guide](./docs/architecture.md)

---

## Coding Conventions

### Naming

```text
components    → PascalCase
hooks         → camelCase
files         → kebab-case
constants     → UPPER_SNAKE_CASE
```

### Imports

Prefer absolute imports:

```ts
import { Button } from "@/shared/ui/button";
```

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Roadmap

* [ ] Authentication module
* [ ] Internationalization
* [ ] Storybook
* [ ] E2E Testing

---

## License

MIT
