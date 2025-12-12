import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for songs table
export interface Song {
    id: number;
    title: string;
    artist: string | null;
    lyrics: string;
    language: string;
    is_verified: boolean;
    created_at: string;
}
