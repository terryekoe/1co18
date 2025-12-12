/**
 * @file ThemeToggle.tsx
 * @description Light/dark mode toggle button component.
 * 
 * Displays a sun icon in dark mode and moon icon in light mode.
 * Clicking the button switches between themes.
 * 
 * Uses the useTheme() hook from ThemeProvider for state management.
 */

"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

/**
 * Theme toggle button component.
 * 
 * Renders a circular button with:
 * - Moon icon (🌙) when in light mode (click to go dark)
 * - Sun icon (☀️) when in dark mode (click to go light)
 * 
 * Handles hydration safely by showing a placeholder until mounted.
 * 
 * @example
 * // In header:
 * <ThemeToggle />
 */
export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    // Track mount state to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Show placeholder during SSR to avoid hydration mismatch
    // (Server doesn't know user's theme preference)
    if (!mounted) {
        return (
            <button
                className="p-2 rounded-full hover:bg-[var(--border)] transition-colors"
                aria-label="Toggle theme"
            >
                <div className="w-5 h-5" /> {/* Placeholder for icon */}
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--border)] transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? (
                // Moon icon - shown in light mode (click to go dark)
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            ) : (
                // Sun icon - shown in dark mode (click to go light)
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
            )}
        </button>
    );
}
