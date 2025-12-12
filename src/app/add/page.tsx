/**
 * @file page.tsx (Add Song)
 * @description Page for adding new songs to the database.
 * 
 * Route: /add
 * 
 * This page allows community members to contribute worship lyrics.
 * Submitted songs are marked as unverified by default.
 * 
 * The form includes special character buttons for Twi (ɛ, ɔ, ŋ)
 * to help users without Twi keyboards.
 */

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AddSongForm } from "@/components/AddSongForm";

/**
 * Page metadata for SEO.
 */
export const metadata = {
    title: "Add a Song - 1co18",
    description: "Contribute worship lyrics to the 1co18 database",
};

/**
 * Add Song page component.
 * 
 * Renders a centered form for submitting new songs.
 * The actual form logic is in the AddSongForm component.
 */
export default function AddSongPage() {
    return (
        <div className="min-h-screen gradient-bg">
            {/* Header with Logo and Theme Toggle */}
            <header className="flex items-center justify-between p-4 md:p-6">
                {/* Logo - links back to homepage */}
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

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-4 md:px-6 pb-12">
                {/* Page Title */}
                <h1
                    className="text-3xl md:text-4xl font-bold mb-8 text-center"
                    style={{ fontFamily: "var(--font-outfit)" }}
                >
                    Add a Song
                </h1>

                {/* Form Card */}
                <div className="card p-6 md:p-8">
                    <AddSongForm />
                </div>
            </main>
        </div>
    );
}
