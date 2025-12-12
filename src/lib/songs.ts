// Mock data for development - will be replaced with Supabase
export interface Song {
    id: string;
    title: string;
    artist: string;
    language: string;
    lyrics: string;
}

export const mockSongs: Song[] = [
    {
        id: "1",
        title: "Aseda Yɛ Wo De",
        artist: "Daughters of Glorious Jesus",
        language: "Twi",
        lyrics: `Verse 1:
Aseda yɛ wo de
Nhyira nso yɛ wo de
Wo yɛ ɔdɔ nyinaa mu kɛse
Medaase Awurade

Chorus:
Yɛ ma wo so
Yɛ da wo ase
Ɔdɔ a wodo yɛn
Ɛyɛ kɛse pa ara

Verse 2:
Woagye yɛn nkwa
Wo dwom yɛn nnwom
Wo de wo mogya atew yɛn ho
Medaase Awurade`,
    },
    {
        id: "2",
        title: "Meda W'ase",
        artist: "Joe Mettle",
        language: "Twi",
        lyrics: `Verse 1:
Meda w'ase
Meda w'ase
Wode wo ho ama me
Meda w'ase

Chorus:
Wo yɛ ɔdɔ
Wo yɛ ɔdom
Meda w'ase Awurade
Wo yɛ nyame`,
    },
    {
        id: "3",
        title: "Onyame Ne Wo",
        artist: "Diana Hamilton",
        language: "Twi",
        lyrics: `Verse 1:
Onyame ne wo
Wo nsa so me
Wotua me ɛkwan
Menkuro hwee

Chorus:
Wo yɛ me nyame
Wo yɛ me nkunim
Onyame ne wo
Forever and ever`,
    },
];

export function getSongById(id: string): Song | undefined {
    return mockSongs.find((song) => song.id === id);
}

export function searchSongs(query: string): Song[] {
    const normalized = normalizeForSearch(query.toLowerCase());
    return mockSongs.filter(
        (song) =>
            normalizeForSearch(song.title.toLowerCase()).includes(normalized) ||
            normalizeForSearch(song.artist.toLowerCase()).includes(normalized) ||
            normalizeForSearch(song.lyrics.toLowerCase()).includes(normalized)
    );
}

// Normalize Twi characters for fuzzy search (ɛ→e, ɔ→o, ŋ→n)
function normalizeForSearch(text: string): string {
    return text
        .replace(/ɛ/g, "e")
        .replace(/Ɛ/g, "E")
        .replace(/ɔ/g, "o")
        .replace(/Ɔ/g, "O")
        .replace(/ŋ/g, "n")
        .replace(/Ŋ/g, "N");
}
