"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl">
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
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a song..."
                    className="flex-1 bg-transparent outline-none text-lg placeholder:text-[var(--muted)]"
                    style={{ fontFamily: "var(--font-inter)" }}
                />
            </div>
        </form>
    );
}
