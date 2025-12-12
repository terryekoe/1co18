"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchSongs, Song } from "@/lib/songs";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

// Highlight matching text in results
function HighlightMatch({ text, query }: { text: string; query: string }) {
    if (!query.trim()) return <>{text}</>;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <span key={i} className="text-[var(--accent)] font-medium">
                        {part}
                    </span>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
}

export function SearchBar() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Song[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const debouncedQuery = useDebounce(query, 300);

    // Search when debounced query changes
    useEffect(() => {
        if (debouncedQuery.trim()) {
            const results = searchSongs(debouncedQuery).slice(0, 5);
            setSuggestions(results);
            setIsOpen(true);
            setSelectedIndex(-1);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [debouncedQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            router.push(`/song/${suggestions[selectedIndex].id}`);
        } else if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
        setIsOpen(false);
    };

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

                    {/* Input */}
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
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 card overflow-hidden shadow-lg z-50">
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
                                        <div
                                            className="font-medium"
                                            style={{ fontFamily: "var(--font-outfit)" }}
                                        >
                                            <HighlightMatch text={song.title} query={query} />
                                        </div>
                                        <div className="text-sm text-[var(--muted)]">
                                            {song.artist}
                                        </div>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] bg-opacity-10 text-[var(--accent)]">
                                        {song.language}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Search all results link */}
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
                </div>
            )}
        </div>
    );
}
