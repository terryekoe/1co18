/**
 * @file formatLyrics.ts
 * @description Utility functions for formatting lyrics for projection software.
 * 
 * This file contains the "Smart Copy" functionality that formats lyrics
 * for import into church projection software like FreeShow and EasyWorship.
 * 
 * Supports multiple slide formats:
 * - 2 lines per slide
 * - 4 lines per slide
 * - Full verse per slide
 * 
 * Also provides OpenLyrics XML export for maximum compatibility.
 */

import { Song } from "@/lib/songs";

/** Available slide format options */
export type SlideFormat = "2-lines" | "4-lines" | "full-verse";

/**
 * Splits lyrics into slides based on the selected format.
 * 
 * @param lyrics - The raw lyrics text
 * @param format - The slide format to use
 * @returns Array of slide strings, each representing one slide
 */
export function splitIntoSlides(lyrics: string, format: SlideFormat): string[] {
  // Split by paragraph (double newline) for verse detection
  const paragraphs = lyrics.split(/\n\n+/).filter(p => p.trim());

  if (format === "full-verse") {
    // Each paragraph (verse/chorus) becomes one slide
    return paragraphs;
  }

  const slides: string[] = [];
  const linesPerSlide = format === "2-lines" ? 2 : 4;

  for (const paragraph of paragraphs) {
    const lines = paragraph.split("\n").filter(l => l.trim());

    // Group lines according to format
    for (let i = 0; i < lines.length; i += linesPerSlide) {
      const slideLines = lines.slice(i, i + linesPerSlide);
      slides.push(slideLines.join("\n"));
    }
  }

  return slides;
}

/**
 * Formats a song's lyrics for projection software.
 * 
 * Output format:
 * - Header with title and author
 * - Each slide separated by double blank lines
 * - Compatible with FreeShow, EasyWorship, and similar software
 * 
 * @param song - The song object to format
 * @param format - The slide format to use (default: "full-verse")
 * @returns Formatted string ready to paste into projection software
 * 
 * @example
 * const formatted = formatForProjection(song, "2-lines");
 * navigator.clipboard.writeText(formatted);
 */
export function formatForProjection(song: Song, format: SlideFormat = "full-verse"): string {
  // Split lyrics into slides
  const slides = splitIntoSlides(song.lyrics, format);

  // Join slides with double blank lines (slide separator for FreeShow)
  return slides.join("\n\n\n");
}

/**
 * Parses lyrics to identify verse/chorus sections.
 * Looks for markers like [Verse 1], [Chorus], [Bridge], etc.
 * 
 * @param lyrics - The raw lyrics text
 * @returns Array of sections with type and content
 */
export function parseLyricsSections(lyrics: string): Array<{ type: string; content: string }> {
  const sections: Array<{ type: string; content: string }> = [];

  // Regex to match section markers like [Verse 1], [Chorus], etc.
  const sectionRegex = /\[(Verse\s*\d*|Chorus|Bridge|Pre-Chorus|Intro|Outro|Tag)\]/gi;

  // Split by section markers while keeping the markers
  const parts = lyrics.split(sectionRegex);

  let currentType = "Verse";

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue;

    // Check if this part is a section marker
    if (sectionRegex.test(`[${part}]`)) {
      currentType = part;
    } else {
      sections.push({
        type: currentType,
        content: part
      });
    }
  }

  // If no sections were found, treat entire lyrics as one section
  if (sections.length === 0 && lyrics.trim()) {
    sections.push({ type: "Verse", content: lyrics.trim() });
  }

  return sections;
}

/**
 * Generates an OpenLyrics XML file for a song.
 * 
 * OpenLyrics is an open standard for sharing worship lyrics.
 * See: http://openlyrics.org/
 * 
 * @param song - The song object to convert to XML
 * @returns XML string in OpenLyrics format
 */
export function generateOpenLyricsXML(song: Song): string {
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
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
