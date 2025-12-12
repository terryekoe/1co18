/**
 * @file formatLyrics.ts
 * @description Utility functions for formatting lyrics for projection software.
 * 
 * This file contains the "Smart Copy" functionality that formats lyrics
 * for import into church projection software like FreeShow and EasyWorship.
 * 
 * It also provides OpenLyrics XML export for maximum compatibility.
 */

import { Song } from "@/lib/songs";

/**
 * Formats a song's lyrics for projection software (FreeShow, EasyWorship).
 * 
 * The output format includes:
 * - Title: [Song Title]
 * - Author: [Artist Name]
 * - [Blank line]
 * - [Full lyrics]
 * 
 * This format is recognized by most church projection software for import.
 * 
 * @param song - The song object to format
 * @returns Formatted string ready to paste into projection software
 * 
 * @example
 * const formatted = formatForProjection(song);
 * navigator.clipboard.writeText(formatted);
 */
export function formatForProjection(song: Song): string {
  // Header format required by EasyWorship/FreeShow imports
  const header = `Title: ${song.title}\nAuthor: ${song.artist || "Unknown"}\n\n`;

  // Combine header with full lyrics
  return header + song.lyrics;
}

/**
 * Generates an OpenLyrics XML file for a song.
 * 
 * OpenLyrics is an open standard for sharing worship lyrics.
 * See: http://openlyrics.org/
 * 
 * This XML format is compatible with:
 * - OpenLP
 * - SongBeamer
 * - VideoPsalm
 * - And other OpenLyrics-compatible software
 * 
 * @param song - The song object to convert to XML
 * @returns XML string in OpenLyrics format
 * 
 * @example
 * const xml = generateOpenLyricsXML(song);
 * // Save as .xml file for import into projection software
 */
export function generateOpenLyricsXML(song: Song): string {
  // Escape special XML characters to prevent parsing errors
  const escapedTitle = escapeXml(song.title);
  const escapedArtist = escapeXml(song.artist || "Unknown");
  const escapedLyrics = escapeXml(song.lyrics);

  return `<?xml version="1.0" encoding="UTF-8"?>
<song xmlns="http://openlyrics.info/namespace/2009/song" version="0.8">
  <properties>
    <titles>
      <title>${escapedTitle}</title>
    </titles>
    <authors>
      <author>${escapedArtist}</author>
    </authors>
  </properties>
  <lyrics>
    <verse name="v1">
      <lines>${escapedLyrics.replace(/\n/g, "<br/>")}</lines>
    </verse>
  </lyrics>
</song>`;
}

/**
 * Escapes special XML characters to prevent parsing errors.
 * 
 * @param text - The text to escape
 * @returns Text with XML special characters escaped
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")   // Must be first to avoid double-escaping
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
