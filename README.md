# Week 1 Case — Register & Login Page

Frontend Training Project Aksub FAVE 36. Building a Register and Login page using React + Vite.

## Installation

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Features

- Register a new account (data stored in an array of objects)
- Form validation with error messages on register & login
- Duplicate email check on register
- Navigation between login and register pages

## Project Structure

```
src/
├── components/ui/   # shadcn components
├── lib/             # utility (cn)
├── pages/
│   ├── login/       # Login page
│   └── register/    # Register page
└── store/
    └── users.ts     # Array of objects to store user data
```
