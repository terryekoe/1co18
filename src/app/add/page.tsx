import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AddSongForm } from "@/components/AddSongForm";

export const metadata = {
    title: "Add a Song - 1co18",
    description: "Contribute worship lyrics to the 1co18 database",
};

export default function AddSongPage() {
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
            <main className="max-w-2xl mx-auto px-4 md:px-6 pb-12">
                <h1
                    className="text-3xl md:text-4xl font-bold mb-8 text-center"
                    style={{ fontFamily: "var(--font-outfit)" }}
                >
                    Add a Song
                </h1>

                <div className="card p-6 md:p-8">
                    <AddSongForm />
                </div>
            </main>
        </div>
    );
}
