import { supabase, Song } from "./supabase";

// Normalize Twi characters for search (client-side, for highlighting etc.)
export function normalizeForSearch(text: string): string {
    return text
        .toLowerCase()
        .replace(/ɛ/g, "e")
        .replace(/Ɛ/g, "e")
        .replace(/ɔ/g, "o")
        .replace(/Ɔ/g, "o")
        .replace(/ŋ/g, "n")
        .replace(/Ŋ/g, "n");
}

// Get a song by ID
export async function getSongById(id: string): Promise<Song | null> {
    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("id", parseInt(id))
        .single();

    if (error) {
        console.error("Error fetching song:", error);
        return null;
    }

    return data;
}

// Search songs using the normalized search_text column
export async function searchSongs(query: string): Promise<Song[]> {
    const normalizedQuery = normalizeForSearch(query);

    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .ilike("search_text", `%${normalizedQuery}%`)
        .order("title")
        .limit(20);

    if (error) {
        console.error("Error searching songs:", error);
        return [];
    }

    return data || [];
}

// Search songs (top 5 for suggestions)
export async function searchSongsSuggestions(query: string): Promise<Song[]> {
    const normalizedQuery = normalizeForSearch(query);

    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .ilike("search_text", `%${normalizedQuery}%`)
        .order("title")
        .limit(5);

    if (error) {
        console.error("Error searching songs:", error);
        return [];
    }

    return data || [];
}

// Add a new song
export async function addSong(song: {
    title: string;
    artist: string;
    lyrics: string;
    language: string;
}): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase.from("songs").insert([
        {
            title: song.title,
            artist: song.artist || null,
            lyrics: song.lyrics,
            language: song.language,
            is_verified: false,
        },
    ]);

    if (error) {
        console.error("Error adding song:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

// Re-export Song type for convenience
export type { Song };
