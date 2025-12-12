/**
 * @file CopyButton.tsx
 * @description "Copy for Projection" button with slide format options.
 * 
 * This is the core "Smart Copy" feature of 1co18.
 * Users can choose how to split lyrics into slides:
 * - 2 lines per slide (for slower songs)
 * - 4 lines per slide (standard)
 * - Full verse per slide (for fast songs)
 * 
 * The button copies formatted lyrics to the clipboard and shows
 * a "Copied!" confirmation for 2 seconds.
 */

"use client";

import { useState } from "react";
import { Song } from "@/lib/songs";
import { formatForProjection, SlideFormat } from "@/utils/formatLyrics";

/** Props for the CopyButton component */
interface CopyButtonProps {
    /** The song object to format and copy */
    song: Song;
}

/** Available format options with labels */
const FORMAT_OPTIONS: { value: SlideFormat; label: string }[] = [
    { value: "2-lines", label: "2 lines/slide" },
    { value: "4-lines", label: "4 lines/slide" },
    { value: "full-verse", label: "Full verse" },
];

/**
 * Copy for Projection button with format selector.
 * 
 * Features:
 * - Dropdown to select slide format
 * - One-click copy to clipboard
 * - Visual feedback after copying
 * 
 * @param song - The song to copy
 */
export function CopyButton({ song }: CopyButtonProps) {
    // Currently selected format
    const [format, setFormat] = useState<SlideFormat>("full-verse");

    // Track copy state for showing feedback
    const [copied, setCopied] = useState(false);

    /**
     * Handles the copy action.
     * Formats lyrics with selected format and writes to clipboard.
     */
    const handleCopy = async () => {
        console.log("Format selected:", format);
        const formatted = formatForProjection(song, format);
        console.log("Formatted output:", formatted);
        console.log("Number of slides:", formatted.split("\n\n\n").length);
        await navigator.clipboard.writeText(formatted);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-3">
            {/* Format Selector */}
            <div className="flex gap-1 p-1 bg-[var(--background)] rounded-lg">
                {FORMAT_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => setFormat(option.value)}
                        className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-colors ${format === option.value
                            ? "bg-[var(--accent)] text-white"
                            : "text-[var(--muted)] hover:text-[var(--foreground)]"
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className="w-full btn-primary flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium"
            >
                {copied ? (
                    <>
                        {/* Checkmark icon */}
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
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Copied!
                    </>
                ) : (
                    <>
                        {/* Copy icon */}
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
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copy for Projection
                    </>
                )}
            </button>
        </div>
    );
}
