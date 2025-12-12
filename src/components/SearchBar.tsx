/**
 * @file SearchBar.tsx
 * @description Search bar component with live suggestions dropdown.
 * 
 * Features:
 * - Debounced search (300ms delay to reduce API calls)
 * - Live suggestions dropdown showing top 5 matches
 * - Keyboard navigation (↑↓ to navigate, Enter to select, Escape to close)
 * - Match highlighting (shows which part of the title matched)
 * - Loading indicator during search
 * 
 * This is the main entry point for finding songs in 1co18.
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchSongsSuggestions, Song, normalizeForSearch } from "@/lib/songs";

/**
 * Custom hook for debouncing values.
 * Delays updating the value until user stops typing.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 */
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup: cancel timeout if value changes before delay completes
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Component to highlight matching text in search results.
 * Shows the matched portion in the accent color.
 * 
 * @param text - The full text to display
 * @param query - The search query to highlight
 */
function HighlightMatch({ text, query }: { text: string; query: string }) {
    if (!query.trim()) return <>{text}</>;

    // Normalize both for matching, but display original text
    const normalizedText = normalizeForSearch(text);
    const normalizedQuery = normalizeForSearch(query);

    const index = normalizedText.indexOf(normalizedQuery);
    if (index === -1) return <>{text}</>;

    // Split text at match position
    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);

    return (
        <>
            {before}
            <span className="text-[var(--accent)] font-medium">{match}</span>
            {after}
        </>
    );
}

/**
 * Search bar component with live suggestions.
 * 
 * Behavior:
 * 1. User types in the search box
 * 2. After 300ms delay, searches for matching songs
 * 3. Displays up to 5 suggestions in a dropdown
 * 4. User can click a suggestion or press Enter to search
 * 
 * @example
 * <SearchBar />
 */
export function SearchBar() {
    // Search query entered by user
    const [query, setQuery] = useState("");

    // Search results for dropdown
    const [suggestions, setSuggestions] = useState<Song[]>([]);

    // Dropdown visibility
    const [isOpen, setIsOpen] = useState(false);

    // Loading state while fetching results
    const [isLoading, setIsLoading] = useState(false);

    // Currently selected suggestion (for keyboard navigation)
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const router = useRouter();

    // Refs for DOM elements
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Debounce the search query to avoid too many API calls
    const debouncedQuery = useDebounce(query, 300);

    // Fetch suggestions when debounced query changes
    useEffect(() => {
        async function fetchSuggestions() {
            if (debouncedQuery.trim()) {
                setIsLoading(true);
                const results = await searchSongsSuggestions(debouncedQuery);
                setSuggestions(results);
                setIsOpen(true);
                setSelectedIndex(-1); // Reset selection on new results
                setIsLoading(false);
            } else {
                // Clear suggestions if query is empty
                setSuggestions([]);
                setIsOpen(false);
            }
        }
        fetchSuggestions();
    }, [debouncedQuery]);

    // Close dropdown when clicking outside the component
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /**
     * Handle form submission.
     * If a suggestion is selected, navigate to that song.
     * Otherwise, navigate to search results page.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            // Navigate to selected song
            router.push(`/song/${suggestions[selectedIndex].id}`);
        } else if (query.trim()) {
            // Navigate to search results
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }

        setIsOpen(false);
    };

    /**
     * Handle keyboard navigation in the dropdown.
     * - ArrowDown: Move to next suggestion
     * - ArrowUp: Move to previous suggestion
     * - Escape: Close dropdown
     */
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (!isOpen || suggestions.length === 0) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setSelectedIndex((prev) =>
                        prev < suggestions.length - 1 ? prev + 1 : prev
                    );
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                    break;
                case "Escape":
                    setIsOpen(false);
                    setSelectedIndex(-1);
                    break;
            }
        },
        [isOpen, suggestions.length]
    );

    return (
        <div ref={containerRef} className="w-full max-w-xl relative">
            <form onSubmit={handleSubmit}>
                <div className="search-bar flex items-center rounded-full px-5 py-4">
                    {/* Search Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-3 flex-shrink-0"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>

                    {/* Text Input */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => query.trim() && suggestions.length > 0 && setIsOpen(true)}
                        placeholder="Search for a song..."
                        className="flex-1 bg-transparent outline-none text-lg placeholder:text-[var(--muted)]"
                        style={{ fontFamily: "var(--font-inter)" }}
                        autoComplete="off"
                    />

                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                    )}
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {isOpen && (suggestions.length > 0 || isLoading) && (
                <div className="absolute top-full left-0 right-0 mt-2 card overflow-hidden shadow-lg z-50">
                    {suggestions.length > 0 ? (
                        <>
                            {/* Suggestion List */}
                            <ul className="py-2">
                                {suggestions.map((song, index) => (
                                    <li key={song.id}>
                                        <Link
                                            href={`/song/${song.id}`}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center justify-between px-5 py-3 transition-colors ${index === selectedIndex
                                                    ? "bg-[var(--accent)] bg-opacity-10"
                                                    : "hover:bg-[var(--border)] hover:bg-opacity-50"
                                                }`}
                                        >
                                            <div>
                                                {/* Song Title with Highlight */}
                                                <div
                                                    className="font-medium"
                                                    style={{ fontFamily: "var(--font-outfit)" }}
                                                >
                                                    <HighlightMatch text={song.title} query={query} />
                                                </div>
                                                {/* Artist Name */}
                                                <div className="text-sm text-[var(--muted)]">
                                                    {song.artist || "Unknown artist"}
                                                </div>
                                            </div>
                                            {/* Language Badge */}
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] bg-opacity-10 text-[var(--accent)]">
                                                {song.language}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* "Search for..." Link */}
                            <div className="border-t border-[var(--border)] px-5 py-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                                        setIsOpen(false);
                                    }}
                                    className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                    Search for &quot;{query}&quot;
                                </button>
                            </div>
                        </>
                    ) : (
                        // No Results Message
                        <div className="px-5 py-4 text-center text-[var(--muted)]">
                            No songs found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
