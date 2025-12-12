import { notFound } from "next/navigation";
import Link from "next/link";
import { getSongById } from "@/lib/songs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CopyButton } from "@/components/CopyButton";
import { DownloadButton } from "@/components/DownloadButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SongPage({ params }: PageProps) {
    const { id } = await params;
    const song = getSongById(id);

    if (!song) {
        notFound();
    }

    return (
        <div className="min-h-screen gradient-bg">
            {/* Header */}
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

            {/* Main content */}
            <main className="max-w-5xl mx-auto px-4 md:px-6 pb-12">
                <div className="grid md:grid-cols-[1fr_280px] gap-8">
                    {/* Left: Song info and lyrics */}
                    <div>
                        {/* Song metadata */}
                        <div className="mb-6">
                            <h1
                                className="text-3xl md:text-4xl font-bold mb-2"
                                style={{ fontFamily: "var(--font-outfit)" }}
                            >
                                {song.title}
                            </h1>
                            <p className="text-[var(--muted)] text-lg mb-3">{song.artist}</p>
                            <span className="inline-block px-3 py-1 text-sm rounded-full bg-[var(--accent)] bg-opacity-10 text-[var(--accent)]">
                                {song.language}
                            </span>
                        </div>

                        {/* Lyrics card */}
                        <div className="card p-6 md:p-8">
                            <pre
                                className="lyrics-text text-base md:text-lg"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                {song.lyrics}
                            </pre>
                        </div>
                    </div>

                    {/* Right: Action buttons */}
                    <div className="md:sticky md:top-6 h-fit">
                        <div className="card p-4 space-y-3">
                            <CopyButton song={song} />
                            <DownloadButton song={song} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
