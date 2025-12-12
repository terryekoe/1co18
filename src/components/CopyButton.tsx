/**
 * @file CopyButton.tsx
 * @description "Copy for Projection" button component.
 * 
 * This is the core "Smart Copy" feature of 1co18.
 * It formats lyrics in a way that FreeShow, EasyWorship, and other
 * church projection software can recognize and import.
 * 
 * The button copies formatted lyrics to the clipboard and shows
 * a "Copied!" confirmation for 2 seconds.
 */

"use client";

import { useState } from "react";
import { Song } from "@/lib/songs";
import { formatForProjection } from "@/utils/formatLyrics";

/** Props for the CopyButton component */
interface CopyButtonProps {
    /** The song object to format and copy */
    song: Song;
}

/**
 * Copy for Projection button component.
 * 
 * When clicked:
 * 1. Formats the song using formatForProjection()
 * 2. Copies the formatted text to clipboard
 * 3. Shows "Copied!" feedback for 2 seconds
 * 
 * @param song - The song to copy
 * 
 * @example
 * <CopyButton song={currentSong} />
 */
export function CopyButton({ song }: CopyButtonProps) {
    // Track copy state for showing feedback
    const [copied, setCopied] = useState(false);

    /**
     * Handles the copy action.
     * Formats lyrics and writes to clipboard.
     */
    const handleCopy = async () => {
        // Format lyrics for projection software
        const formatted = formatForProjection(song);

        // Copy to clipboard
        await navigator.clipboard.writeText(formatted);

        // Show feedback and reset after 2 seconds
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="w-full btn-primary flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium"
        >
            {copied ? (
                <>
                    {/* Checkmark icon - shown after copying */}
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
                    {/* Copy icon - default state */}
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
    );
}
