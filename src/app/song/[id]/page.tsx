/**
 * @file page.tsx (Song Detail)
 * @description Individual song page with lyrics and action buttons.
 * 
 * Route: /song/[id]
 * 
 * This page displays:
 * - Song metadata (title, artist, language)
 * - Full lyrics in a readable format
 * - "Copy for Projection" button with format options
 * - "Download OpenLyrics" button (XML export)
 * - "Share QR Code" button
 * - "Print Lyrics" button
 * 
 * The layout is two-column on desktop:
 * - Left: Song info and lyrics
 * - Right: Sticky action panel
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { getSongById } from "@/lib/songs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CopyButton } from "@/components/CopyButton";
import { DownloadButton } from "@/components/DownloadButton";
import { QRShareButton } from "@/components/QRShareButton";
import { PrintButton } from "@/components/PrintButton";

/** Page props with dynamic route parameter */
interface PageProps {
    params: Promise<{ id: string }>;
}

/**
 * Song detail page component.
 * 
 * This is a Server Component that:
 * 1. Extracts the song ID from the URL
 * 2. Fetches the song from Supabase
 * 3. Returns 404 if song not found
 * 4. Renders the song with action buttons
 * 
 * @param params - Route parameters (contains 'id')
 */
export default async function SongPage({ params }: PageProps) {
    const { id } = await params;
    const song = await getSongById(id);

    if (!song) {
        notFound();
    }

    return (
        <div className="min-h-screen gradient-bg">
            {/* Header with Logo and Theme Toggle */}
            <header className="flex items-center justify-between p-4 md:p-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <span
                        className="text-2xl font-bold"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        <span className="text-[var(--accent)]">1</span>co18
                    </span>
                </Link>
                <ThemeToggle />
            </header>

            {/* Main Content - Two Column Layout */}
            <main className="max-w-5xl mx-auto px-4 md:px-6 pb-12">
                <div className="grid md:grid-cols-[1fr_280px] gap-8">

                    {/* Left Column: Song Info and Lyrics */}
                    <div>
                        {/* Song Metadata */}
                        <div className="mb-6">
                            <h1
                                className="text-3xl md:text-4xl font-bold mb-2"
                                style={{ fontFamily: "var(--font-outfit)" }}
                            >
                                {song.title}
                            </h1>
                            <p className="text-[var(--muted)] text-lg mb-3">
                                {song.artist || "Unknown artist"}
                            </p>
                            <span className="inline-block px-3 py-1 text-sm rounded-full bg-[var(--accent)] bg-opacity-10 text-[var(--accent)]">
                                {song.language}
                            </span>
                        </div>

                        {/* Lyrics Card */}
                        <div className="card p-6 md:p-8">
                            <pre
                                className="lyrics-text text-base md:text-lg"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                {song.lyrics}
                            </pre>
                        </div>
                    </div>

                    {/* Right Column: Action Buttons (Sticky on Desktop) */}
                    <div className="md:sticky md:top-6 h-fit space-y-4">
                        {/* Primary Actions */}
                        <div className="card p-4 space-y-3">
                            <CopyButton song={song} />
                            <DownloadButton song={song} />
                        </div>

                        {/* Secondary Actions */}
                        <div className="card p-4 space-y-3">
                            <QRShareButton songId={song.id} songTitle={song.title} />
                            <PrintButton song={song} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
