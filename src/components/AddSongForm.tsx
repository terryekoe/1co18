"use client";

import { useState } from "react";
import { addSong } from "@/lib/songs";

const LANGUAGES = ["Twi", "English", "Ga", "Ewe", "Fante", "Dagbani"];

export function AddSongForm() {
    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        language: "Twi",
        lyrics: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const result = await addSong(formData);

        if (result.success) {
            setSubmitted(true);
        } else {
            setError(result.error || "Failed to submit song. Please try again.");
        }

        setIsSubmitting(false);
    };

    if (submitted) {
        return (
            <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                    Thank You!
                </h2>
                <p className="text-[var(--muted)] mb-6">
                    Your song has been submitted for review.
                </p>
                <button
                    onClick={() => {
                        setSubmitted(false);
                        setFormData({ title: "", artist: "", language: "Twi", lyrics: "" });
                    }}
                    className="btn-primary px-6 py-2 rounded-lg font-medium"
                >
                    Add Another Song
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Song Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Song Title <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Aseda Yɛ Wo De"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20 transition-colors"
                />
            </div>

            {/* Artist */}
            <div>
                <label htmlFor="artist" className="block text-sm font-medium mb-2">
                    Artist / Group
                </label>
                <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    placeholder="e.g., Daughters of Glorious Jesus"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20 transition-colors"
                />
            </div>

            {/* Language */}
            <div>
                <label htmlFor="language" className="block text-sm font-medium mb-2">
                    Language
                </label>
                <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20 transition-colors"
                >
                    {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </div>

            {/* Lyrics */}
            <div>
                <label htmlFor="lyrics" className="block text-sm font-medium mb-2">
                    Lyrics <span className="text-[var(--accent)]">*</span>
                </label>

                {/* Twi Character Buttons */}
                <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs text-[var(--muted)] mr-1 self-center">Insert:</span>
                    {["ɛ", "ɔ", "ŋ", "Ɛ", "Ɔ", "Ŋ"].map((char) => (
                        <button
                            key={char}
                            type="button"
                            onClick={() => {
                                const textarea = document.getElementById("lyrics") as HTMLTextAreaElement;
                                if (textarea) {
                                    const start = textarea.selectionStart;
                                    const end = textarea.selectionEnd;
                                    const newValue =
                                        formData.lyrics.substring(0, start) +
                                        char +
                                        formData.lyrics.substring(end);
                                    setFormData((prev) => ({ ...prev, lyrics: newValue }));
                                    setTimeout(() => {
                                        textarea.focus();
                                        textarea.setSelectionRange(start + 1, start + 1);
                                    }, 0);
                                }
                            }}
                            className="px-3 py-1 text-sm font-medium rounded border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-[var(--surface)]"
                        >
                            {char}
                        </button>
                    ))}
                </div>

                <textarea
                    id="lyrics"
                    name="lyrics"
                    value={formData.lyrics}
                    onChange={handleChange}
                    required
                    rows={12}
                    placeholder="Paste or type lyrics here...

Verse 1:
...

Chorus:
..."
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20 transition-colors resize-y"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 rounded-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Submit Song"
                )}
            </button>
        </form>
    );
}
