/**
 * @file sitemap.ts
 * @description Dynamic sitemap generator for SEO.
 * 
 * This generates a sitemap.xml that includes:
 * - Homepage
 * - Add song page
 * - All individual song pages
 * 
 * Search engines use this to discover and index all pages.
 */

import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://1co18.com';

    // Fetch all song IDs from database
    const { data: songs } = await supabase
        .from('songs')
        .select('id, created_at')
        .order('id');

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/add`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Dynamic song pages
    const songPages: MetadataRoute.Sitemap = (songs || []).map((song) => ({
        url: `${baseUrl}/song/${song.id}`,
        lastModified: new Date(song.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...songPages];
}
