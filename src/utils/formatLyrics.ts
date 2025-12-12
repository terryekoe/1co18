import { Song } from "@/lib/songs";

/**
 * Format lyrics for projection software (FreeShow, EasyWorship)
 * Output structure follows the expected import format
 */
export function formatForProjection(song: Song): string {
    // Header required by EasyWorship/FreeShow imports
    const header = `Title: ${song.title}\nAuthor: ${song.artist}\n\n`;

    // Ensure proper section formatting with blank lines
    return header + song.lyrics;
}

/**
 * Generate OpenLyrics XML format for power users
 * See: http://openlyrics.org/
 */
export function generateOpenLyricsXML(song: Song): string {
    const escapedTitle = escapeXml(song.title);
    const escapedArtist = escapeXml(song.artist);
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

function escapeXml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
