# QuizTime Frontend

Frontend application for QuizTime, built with React and Vite.

You can visit our website [here](https://quiz-time-with-react.vercel.app/).

[Here](https://github.com/ApostolQleg/QuizTime-backend/) is backend of our website.

## Table of Contents

- [Overview](#overview)
- [Main Features](#main-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [Configuration](#configuration)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Backend Integration](#backend-integration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Authors](#authors)

## Overview

QuizTime Client is a single-page application (SPA) for creating and taking quizzes.

Core flows:

- Browse quizzes with search, sort, and pagination.
- Take quizzes as guest or logged-in user.
- Save and review results (for authenticated users).
- Create, edit, and manage authored quizzes.
- Manage profile settings, including password change and account deletion.

## Main Features

- Authentication: email/password registration and login, verification code flow, Google OAuth login and account linking.
- Quiz management: create, update, delete, and manage quizzes with a question/option editor.
- Quiz sessions and results: interactive quiz flow, result saving, and result details/history.
- Profile: private profile management, public profile pages, password change, account deletion, and avatar color generation.
- UX: responsive interface with Tailwind CSS v4 and app-wide theme variables.

## Tech Stack

- React 19
- React Router 7
- Vite 7
- Tailwind CSS 4 (via @tailwindcss/vite)
- Google OAuth (@react-oauth/google)
- ESLint 9

## Project Structure

```text
src/
    app/              # App bootstrap, routing, and providers
    entities/         # Business entities (domain-specific atomic UI)
        quiz/
    features/         # Domain modules (auth, profile, quizzes, results)
        auth/
        profile/
        quizzes/
        results/
    pages/            # Route-level composition layer
    shared/           # Reusable cross-feature modules
        api/          # API client and headers
        assets/       # Static assets and icons
        config/       # Global app config/constants
        hooks/        # Shared hooks (debounce, auto reload)
        libs/         # Shared utils (jwt, formatDateTime)
        ui/           # Low-level UI primitives
    widgets/          # Large compositional UI blocks (header, footer, grid, toolbar)
    styles.css        # Global styles and theme tokens
```

## Routing

Configured in `src/app/AppRoutes.jsx`.

- / - Quizzes list
- /my-quizzes - Current user's quizzes
- /login - Login page
- /register - Registration page
- /results - Results list
- /help - Help page
- /profile - Current user profile
- /quiz/:quizId - Quiz attempt page
- /result/:quizId/:resultIdParam - Quiz result details page
- /create - Quiz creation page
- /manage/:quizId - Quiz edit/manage page
- /user/:userId - Public profile page
- /\* - Not found page

## Configuration

Global app constants are centralized in `src/shared/config/config.js`.

It currently includes:

- API pagination limits (`API_CONFIG`)
- Validation/form constraints (`QUIZ_CONSTRAINTS`)
- Auto-reload timeout (`AUTO_RELOAD_CONFIG`)
- Color animation settings (`COLOR_ANIMATION_CONFIG`)
- Sort options labels and ids (`SORT_OPTIONS`)

## Prerequisites

- Bun 1.0+

## Installation

```bash
git clone <your-repository-url>
cd QuizTime
bun install
```

Start development server:

```bash
bun run dev
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_API_URL=http://localhost:3000/api
```

Notes:

- `VITE_GOOGLE_CLIENT_ID` is consumed in `src/app/main.jsx` by `GoogleOAuthProvider`.
- `VITE_API_URL` is consumed in `src/shared/api/client.js` as `API_URL`.
- `AUTH_URL` is derived from `API_URL` by replacing `/api` with `/auth`.

## Available Scripts

- `bun run dev` - Start Vite dev server.
- `bun run build` - Create production build.
- `bun run preview` - Preview production build locally.
- `bun run lint` - Run ESLint.
- `bun run test` - Run Vitest once, allowing projects without test files.
- `bun run test:watch` - Run Vitest in watch mode, allowing projects without test files.

## Backend Integration

The frontend expects a backend that provides these route groups:

- `/auth` (register, login, Google auth, verification code, account link)
- `/api/quizzes`
- `/api/results`
- `/api/user`

Auth token behavior:

- Token is read from localStorage key `token`.
- User object is read from localStorage key `user`.
- Authorization header uses `Bearer <token>` when available.

## Deployment

Vercel SPA rewrite is configured in `vercel.json`:

- All routes are rewritten to `/index.html`.

Build command:

```bash
bun run build
```

Output directory:

- `dist`

## Troubleshooting

- Google login fails immediately: verify `VITE_GOOGLE_CLIENT_ID` is set correctly.
- API requests fail in development: confirm backend is running and verify `VITE_API_URL` usage in `src/shared/api/client.js`.
- Refreshing non-root routes returns 404 in production: ensure hosting has SPA rewrite support (already set for Vercel).

## License

MIT. See [LICENSE](LICENSE) for details.

## Authors

- **Oleg Bondarenko** - _Lead Developer_
    - National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"
    - Faculty of Informatics and Computer Engineering (FIOT)
    - Group: **IM-54**
- **dimpennn** - _Partner Developer_
    - National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"
    - Faculty of Informatics and Computer Engineering (FIOT)
    - Group: **IM-54**
