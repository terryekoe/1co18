import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBar } from "@/components/SearchBar";
import { searchSongs } from "@/lib/songs";

interface PageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
    const { q: query } = await searchParams;
    const results = query ? searchSongs(query) : [];

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

            {/* Search bar */}
            <div className="max-w-xl mx-auto px-4 mb-8">
                <SearchBar />
            </div>

            {/* Results */}
            <main className="max-w-3xl mx-auto px-4 md:px-6 pb-12">
                {query && (
                    <p className="text-[var(--muted)] mb-6">
                        {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
                    </p>
                )}

                {results.length > 0 ? (
                    <div className="space-y-4">
                        {results.map((song) => (
                            <Link
                                key={song.id}
                                href={`/song/${song.id}`}
                                className="card block p-4 md:p-6 hover:border-[var(--accent)] transition-colors"
                            >
                                <h2
                                    className="text-xl font-semibold mb-1"
                                    style={{ fontFamily: "var(--font-outfit)" }}
                                >
                                    {song.title}
                                </h2>
                                <p className="text-[var(--muted)]">{song.artist}</p>
                                <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-[var(--accent)] bg-opacity-10 text-[var(--accent)]">
                                    {song.language}
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : query ? (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-4">🔍</div>
                        <h2 className="text-xl font-semibold mb-2">No songs found</h2>
                        <p className="text-[var(--muted)] mb-6">
                            Try a different search term or add this song to our database.
                        </p>
                        <Link
                            href="/add"
                            className="btn-primary inline-block px-6 py-2 rounded-lg font-medium"
                        >
                            Add a Song
                        </Link>
                    </div>
                ) : null}
            </main>
        </div>
    );
}
