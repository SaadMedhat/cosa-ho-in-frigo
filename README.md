# Cosa ho in frigo?

> Discover recipes and cocktails with the ingredients you already have at home.

**[Live Demo](https://cosa-ho-in-frigo-kk2j94ro0-saads-projects-ebf20f60.vercel.app/)**

## About

"Cosa ho in frigo?" (What's in my fridge?) is a mobile-first web app that helps you find recipes and cocktails based on ingredients you have on hand. Add what's in your fridge, hit search, and get results ranked by how well they match.

## Features

- **Ingredient-based search** — add up to 10 ingredients and find matching recipes or cocktails
- **Smart ranking** — results scored by ingredient match percentage
- **Dual tabs** — browse Ricette (recipes) and Cocktail sections
- **Sorprendimi!** — surprise button that fetches a random recipe/cocktail with confetti
- **Dark mode** — toggle between light and dark themes, persisted across sessions
- **Smooth animations** — Framer Motion transitions, spring physics, and skeleton loaders
- **Mobile-first** — optimized for mobile with bottom tab navigation and safe area support

## Tech Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — styling with custom theme tokens
- **Framer Motion** — animations and transitions
- **TanStack React Query** — data fetching and caching
- **next-themes** — dark mode management
- **TheMealDB** & **TheCocktailDB** APIs — recipe and cocktail data

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (tabs)/           # Main tabbed interface (recipes & cocktails)
│   ├── recipe/[id]/      # Recipe detail page
│   └── cocktail/[id]/    # Cocktail detail page
├── components/
│   ├── ui/               # Reusable UI (button, card, chip, skeleton, etc.)
│   ├── ingredients/      # Ingredient input, chips, quick-add suggestions
│   ├── results/          # Search results list and item cards
│   └── recipe/           # Recipe detail components (hero, checklist, steps)
├── hooks/                # Custom hooks (ingredients state, search)
├── lib/
│   ├── api/              # API clients and React Query hooks
│   └── utils/            # Scoring, ingredient parsing, classnames
└── types/                # TypeScript type definitions
```
