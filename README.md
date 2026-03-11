# QuizTime Frontend

Frontend application for QuizTime, built with React and Vite.

It supports guest and authenticated quiz flows, quiz authoring, result tracking, profile management, and Google OAuth integration.

## Table of Contents

- [Overview](#overview)
- [Main Features](#main-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routing](#routing)
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

- Authentication
    - Email/password registration and login.
    - Verification code sending during auth flow.
    - Google OAuth login and account linking.
- Quiz management
    - Create, update, and delete quizzes.
    - Rich quiz editor with questions and options.
    - Personal quiz list page.
- Quiz taking and results
    - Interactive quiz session.
    - Result saving and result details.
    - User results history.
- Profile
    - Private profile editing.
    - Public profile viewing.
    - Animated color/avatar generation utilities.
- UX
    - Responsive UI.
    - Tailwind CSS v4 with custom theme variables.

## Tech Stack

- React 19
- React Router 7
- Vite 7
- Tailwind CSS 4 (via @tailwindcss/vite)
- Sass
- Google OAuth (@react-oauth/google)
- ESLint 9

## Project Structure

```text
src/
    api/         # HTTP layer (auth, quizzes, results, user)
    components/  # Reusable UI blocks grouped by domain
    hooks/       # Custom React hooks
    libs/        # Utility libraries (jwt, generators, formatting)
    pages/       # Route-level page components
    providers/   # Context providers (Auth)
    ui/          # Low-level UI primitives
```

## Routing

Configured in src/AppRoutes.jsx.

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
-   -   - Not found page

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+

## Installation

```bash
git clone <your-repository-url>
cd QuizTime
npm install
```

Start development server:

```bash
npm run dev
```

## Environment Variables

Create a .env file in the project root:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_API_URL=http://localhost:3000/api
```

Notes:

- VITE_GOOGLE_CLIENT_ID is used in src/main.jsx by GoogleOAuthProvider.
- API base URL is currently hardcoded in src/api/api.js as http://localhost:3000/api.
- To use VITE_API_URL, uncomment the environment-based line in src/api/api.js and remove or replace the hardcoded one.

## Available Scripts

- npm run dev - Start Vite dev server.
- npm run build - Create production build.
- npm run preview - Preview production build locally.
- npm run lint - Run ESLint.

## Backend Integration

The frontend expects a backend that provides these route groups:

- /auth (register, login, Google auth, verification code)
- /api/quizzes
- /api/results
- /api/user

Auth token behavior:

- Token is read from localStorage key token.
- User object is read from localStorage key user.
- Authorization header uses Bearer token when available.

## Deployment

Vercel SPA rewrite is already configured in vercel.json:

- All routes are rewritten to /index.html.

Build command:

```bash
npm run build
```

Output directory:

- dist

## Troubleshooting

- Google login fails immediately
    - Verify VITE_GOOGLE_CLIENT_ID is set correctly.
- API requests fail in development
    - Confirm backend is running on expected host/port.
    - Check src/api/api.js base URL configuration.
- Refreshing non-root route returns 404 in production
    - Ensure hosting has SPA rewrite support (already set for Vercel).

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