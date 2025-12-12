/**
 * @file ThemeProvider.tsx
 * @description Theme context provider for light/dark mode functionality.
 * 
 * This component manages the application's color theme, providing:
 * - Light and dark mode toggle
 * - Persistence to localStorage
 * - System preference detection on first load
 * - CSS class toggling on the document root element
 * 
 * Usage: Wrap your app with <ThemeProvider> in layout.tsx,
 * then use the useTheme() hook in any component to access theme state.
 */

"use client";

import { createContext, useContext, useEffect, useState } from "react";

/** Theme options available in the application */
type Theme = "light" | "dark";

/** Shape of the theme context value */
interface ThemeContextType {
    /** Current active theme */
    theme: Theme;
    /** Function to toggle between light and dark mode */
    toggleTheme: () => void;
}

/**
 * React context for theme state.
 * Undefined if accessed outside of ThemeProvider.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider component that wraps the application.
 * 
 * Features:
 * - Initializes theme from localStorage or system preference
 * - Adds/removes 'dark' class on document.documentElement
 * - Persists theme choice to localStorage
 * 
 * @param children - Child components that will have access to theme context
 * 
 * @example
 * // In layout.tsx:
 * <ThemeProvider>
 *   {children}
 * </ThemeProvider>
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Current theme state (defaults to light)
    const [theme, setTheme] = useState<Theme>("light");

    // Track if component has mounted (for SSR hydration)
    const [mounted, setMounted] = useState(false);

    // On mount, check localStorage or system preference for initial theme
    useEffect(() => {
        setMounted(true);

        // First, check if user has a saved preference
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored) {
            setTheme(stored);
        }
        // Otherwise, check system preference
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        }
    }, []);

    // Apply theme changes to document and persist to localStorage
    useEffect(() => {
        if (mounted) {
            // Toggle 'dark' class on root element (used by CSS variables)
            document.documentElement.classList.toggle("dark", theme === "dark");
            // Save preference for next visit
            localStorage.setItem("theme", theme);
        }
    }, [theme, mounted]);

    /**
     * Toggles between light and dark theme.
     */
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * Hook to access theme context.
 * Must be used within a ThemeProvider.
 * 
 * @returns Object containing current theme and toggleTheme function
 * @throws Error if used outside of ThemeProvider
 * 
 * @example
 * const { theme, toggleTheme } = useTheme();
 * console.log(theme); // "light" or "dark"
 * toggleTheme(); // Switches theme
 */
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
