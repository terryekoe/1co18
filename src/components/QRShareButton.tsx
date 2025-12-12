/**
 * @file QRShareButton.tsx
 * @description QR code share button for songs.
 * 
 * Generates a QR code that links to the current song page.
 * Useful for sharing songs during service or rehearsal -
 * team members can scan to open the song on their phones.
 */

"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";

/** Props for the QRShareButton component */
interface QRShareButtonProps {
    /** The song ID to generate URL for */
    songId: number;
    /** The song title for display */
    songTitle: string;
}

/**
 * QR Code share button component.
 * 
 * When clicked, opens a modal with a QR code that links to the song.
 * The QR code is generated client-side using the qrcode library.
 * 
 * @param songId - The ID of the song
 * @param songTitle - The title to display in the modal
 */
export function QRShareButton({ songId, songTitle }: QRShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

    // Generate QR code when modal opens
    useEffect(() => {
        if (isOpen && !qrDataUrl) {
            const url = `${window.location.origin}/song/${songId}`;
            QRCode.toDataURL(url, {
                width: 200,
                margin: 2,
                color: {
                    dark: "#1a1a1a",
                    light: "#ffffff",
                },
            }).then(setQrDataUrl);
        }
    }, [isOpen, qrDataUrl, songId]);

    return (
        <>
            {/* Share Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="w-full btn-secondary flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium"
            >
                {/* QR Code Icon */}
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
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="3" height="3" />
                    <rect x="18" y="14" width="3" height="3" />
                    <rect x="14" y="18" width="3" height="3" />
                    <rect x="18" y="18" width="3" height="3" />
                </svg>
                Share QR Code
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="card p-6 max-w-sm mx-4 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Title */}
                        <h3
                            className="text-lg font-semibold mb-4"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            {songTitle}
                        </h3>

                        {/* QR Code */}
                        {qrDataUrl ? (
                            <img
                                src={qrDataUrl}
                                alt={`QR code for ${songTitle}`}
                                className="mx-auto mb-4 rounded-lg"
                            />
                        ) : (
                            <div className="w-[200px] h-[200px] mx-auto mb-4 bg-[var(--border)] rounded-lg animate-pulse" />
                        )}

                        {/* Instructions */}
                        <p className="text-sm text-[var(--muted)] mb-4">
                            Scan to open this song on your phone
                        </p>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="btn-primary px-4 py-2 rounded-lg font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
