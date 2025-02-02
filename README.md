# WireFrame Dashboard

## Overview
This project is a **React-based dashboard application** built using **Vite**, **TypeScript**, and **Tailwind CSS**. The application is designed to provide a structured and interactive dashboard for data visualization and insights.

## Features
- **React & Vite** for a fast development experience.
- **TypeScript** for better type safety and maintainability.
- **Tailwind CSS** for efficient and customizable styling.
- **Modular Navigation** for a seamless user experience.
- **Multiple Screens** including Category Summary, Executive Summary, and Price Evolution.
- **Improved KPI visualization** with accurate structure and values.

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **npm** or **yarn**

### Steps to Set Up
1. Clone the repository:
   ```sh
   git clone <repo-url>
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
4. Open your browser and go to:
   ```
   http://localhost:5173
   ```
   *(Default Vite development server port)*

## Project Structure
```
project/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Individual screens
│   ├── styles/         # Tailwind and global styles
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Main application file
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── package.json        # Dependencies & scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```


---
### Notes
- If you encounter issues, check the `vite.config.ts` and `package.json` versions.
- Consider running `npm update` to ensure dependencies are up-to-date.
- Tailwind styles can be customized in `tailwind.config.js`.
