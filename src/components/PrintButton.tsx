/**
 * @file PrintButton.tsx
 * @description Print-friendly view button for songs.
 * 
 * Opens a clean, minimal print view of the song lyrics
 * suitable for printing as a one-page lyric sheet.
 */

"use client";

import { Song } from "@/lib/songs";

/** Props for the PrintButton component */
interface PrintButtonProps {
    /** The song object to print */
    song: Song;
}

/**
 * Print button component.
 * 
 * Opens a new window with a print-optimized view of the lyrics,
 * then triggers the browser's print dialog.
 * 
 * @param song - The song to print
 */
export function PrintButton({ song }: PrintButtonProps) {
    const handlePrint = () => {
        // Create print-friendly HTML
        const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${song.title} - Lyrics</title>
          <style>
            @page {
              margin: 1in;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 4px;
            }
            .artist {
              font-size: 16px;
              color: #666;
              margin-bottom: 24px;
            }
            .language {
              display: inline-block;
              padding: 4px 12px;
              background: #f0f0f0;
              border-radius: 20px;
              font-size: 12px;
              margin-bottom: 24px;
            }
            .lyrics {
              white-space: pre-wrap;
              font-size: 14px;
              line-height: 1.8;
            }
            .footer {
              margin-top: 40px;
              padding-top: 16px;
              border-top: 1px solid #e0e0e0;
              font-size: 11px;
              color: #999;
              text-align: center;
            }
            @media print {
              .footer { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>${song.title}</h1>
          <p class="artist">${song.artist || "Unknown artist"}</p>
          <span class="language">${song.language}</span>
          <pre class="lyrics">${song.lyrics}</pre>
          <p class="footer">Printed from 1co18 • 1co18.vercel.app</p>
        </body>
      </html>
    `;

        // Open print window
        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            // Trigger print after content loads
            printWindow.onload = () => {
                printWindow.print();
            };
        }
    };

    return (
        <button
            onClick={handlePrint}
            className="w-full btn-secondary flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium"
        >
            {/* Print Icon */}
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
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print Lyrics
        </button>
    );
}
