/**
 * @file DownloadButton.tsx
 * @description OpenLyrics XML download button component.
 * 
 * Allows power users to download songs in the OpenLyrics XML format,
 * which is compatible with many church projection software applications.
 * 
 * See: http://openlyrics.org/
 */

"use client";

import { Song } from "@/lib/songs";
import { generateOpenLyricsXML } from "@/utils/formatLyrics";

/** Props for the DownloadButton component */
interface DownloadButtonProps {
    /** The song object to download as XML */
    song: Song;
}

/**
 * Download OpenLyrics button component.
 * 
 * When clicked:
 * 1. Generates OpenLyrics XML for the song
 * 2. Creates a downloadable blob
 * 3. Triggers browser download with filename based on song title
 * 
 * @param song - The song to download
 * 
 * @example
 * <DownloadButton song={currentSong} />
 */
export function DownloadButton({ song }: DownloadButtonProps) {
    /**
     * Handles the download action.
     * Creates an XML blob and triggers browser download.
     */
    const handleDownload = () => {
        // Generate the OpenLyrics XML content
        const xml = generateOpenLyricsXML(song);

        // Create a blob for the download
        const blob = new Blob([xml], { type: "application/xml" });
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger download
        const a = document.createElement("a");
        a.href = url;
        // Sanitize filename: replace spaces with underscores
        a.download = `${song.title.replace(/\s+/g, "_")}.xml`;

        // Trigger download and cleanup
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Release the blob URL
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleDownload}
            className="w-full btn-secondary flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium"
        >
            {/* Download icon */}
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download OpenLyrics
        </button>
    );
}
