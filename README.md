# EnvScanner Frontend

This directory contains the source code for the EnvScanner frontend application. EnvScanner is a tool designed to detect and monitor exposed API keys and sensitive credentials in public repositories, aiming to raise awareness about API security.

The frontend is a React application built with Vite and TypeScript, styled with Tailwind CSS. It provides a user-friendly interface to interact with the EnvScanner system.

## Key Features

*   **Landing Page (`src/pages/LandingPage.tsx`):**
    *   Introduces EnvScanner and its purpose (SECURITY_BREACH_MONITOR).
    *   Highlights system capabilities: Repository Infiltration, Pattern Recognition, Entropy Analysis, and Vendor Detection.
    *   Explains the underlying Algorithm Theory (Entropy, Regex, Real-Time Scan).
    *   Lists supported Target Vendors.
    *   Includes a Developer Profile section for Imran Pasha.
    *   Provides a Critical Warning and Disclaimer on responsible use.
    *   Responsive navigation and animated content using `framer-motion`.
*   **Dashboard Page (`src/pages/Dashboard.tsx`):**
    *   Displays key statistics: Verified Keys, Processing Keys, Total Found, and Unique Vendors.
    *   Visualizes a Threat Detection Timeline using a chart (`recharts`).
    *   Presents a filterable and paginated table of Exposed Credentials.
    *   Shows detailed information for each credential in a modal, including options to copy the key and visit the source repository file.
    *   Fetches and periodically refreshes data from the backend API (`https://env-scanner.vercel.app/api/keys`).
    *   Uses toast notifications (`sonner`) for user feedback.
*   **Core Components & Structure:**
    *   **`src/App.tsx`**: Main application component, handles routing between the Landing Page and Dashboard.
    *   **`src/main.tsx`**: Application entry point.
    *   **`src/components/ui/`**: Collection of reusable UI components (Button, Card, Badge, Select, etc.), built with utility-first CSS (Tailwind) and potentially Radix UI primitives.
    *   **`src/hooks/use-toast.ts`**: Custom hook for managing toast notifications.
    *   **`src/lib/utils.ts`**: Utility functions, including `cn` for class name management.
    *   **Styling**: Primarily uses Tailwind CSS, with global styles and theme variables defined in `src/index.css` and `src/App.css`.

## Technologies Used

*   **React**: JavaScript library for building user interfaces.
*   **Vite**: Fast frontend build tool.
*   **TypeScript**: Superset of JavaScript that adds static typing.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **React Router DOM**: For client-side routing.
*   **Framer Motion**: For animations.
*   **Recharts**: For creating charts.
*   **Sonner**: For toast notifications.
*   **React Icons**: For iconography.

## Setup and Running

(Instructions on how to set up and run the project locally would typically go here, e.g., cloning, installing dependencies, and starting the development server.)

```bash
npm install
npm run dev
```

## Purpose & Disclaimer

This tool is designed for educational and research purposes to raise awareness about API security. Users are fully responsible for any misuse of discovered credentials. Unauthorized access to systems is illegal. We encourage users to report findings to developers or vendors through proper channels to help resolve security exposures.
