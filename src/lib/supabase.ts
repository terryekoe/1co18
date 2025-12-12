/**
 * @file supabase.ts
 * @description Supabase client configuration and type definitions.
 * 
 * This file initializes the Supabase client using environment variables
 * and exports the Song type that matches the database schema.
 * 
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous/public key
 */

import { createClient } from "@supabase/supabase-js";

// Load Supabase credentials from environment variables
// These are prefixed with NEXT_PUBLIC_ to make them available client-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase client instance.
 * Used for all database operations (queries, inserts, etc.)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Song type definition matching the Supabase 'songs' table schema.
 * 
 * @property id - Unique identifier (auto-generated)
 * @property title - Song title (required)
 * @property artist - Artist or group name (optional)
 * @property lyrics - Full song lyrics (required)
 * @property language - Song language (defaults to 'Twi')
 * @property is_verified - Whether lyrics have been reviewed
 * @property created_at - Timestamp of when the song was added
 */
export interface Song {
    id: number;
    title: string;
    artist: string | null;
    lyrics: string;
    language: string;
    is_verified: boolean;
    created_at: string;
}
