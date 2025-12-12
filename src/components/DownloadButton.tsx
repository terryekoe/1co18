"use client";

import { Song } from "@/lib/songs";
import { generateOpenLyricsXML } from "@/utils/formatLyrics";

interface DownloadButtonProps {
    song: Song;
}

export function DownloadButton({ song }: DownloadButtonProps) {
    const handleDownload = () => {
        const xml = generateOpenLyricsXML(song);
        const blob = new Blob([xml], { type: "application/xml" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${song.title.replace(/\s+/g, "_")}.xml`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleDownload}
            className="w-full btn-secondary flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium"
        >
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
