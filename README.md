# 🎵 Genius Lyrics Parser

> A simple utility to extract clean lyrics from [genius.com](https://genius.com), bypassing the limitations of the official Genius API.

---

## 📦 Installation

```bash
bun add genius-lyrics-parser
# or
npm install genius-lyrics-parser
# or
yarn add genius-lyrics-parser
```

# 🚀 Quick Start

```ts
import GetLyrics from 'genius-lyrics-parser'

const lyrics = await GetLyrics(["david-kushner", "daylight"])
console.log(lyrics)
```

# 💡 What does it do?
**Genius Lyrics Parser** fetches the HTML of a song page from Genius and extracts only the lyrics text.

Why?
Because the official Genius API does not return full lyrics. This package solves that by scraping and parsing the embedded state inside the HTML.

#  Input Format

```ts
["artist-name", "song-title"]
// First element: the artist’s name in URL format
//
// Second element: the song’s name in URL format
// Example:
//https://genius.com/david-kushner-daylight-lyrics → ["david-kushner", "daylight"]
```


📤 Output Format
The result is a string[] with each line of the lyrics:

```ts
[
"[Verse 1]",
"Telling myself I won't go there",
"Oh, but I know that I won't care",
"Tryna wash away all the blood I've spilt",
"...",
"[Chorus]",
"Oh, I love it and I hate it at the same time"...
]

```

No HTML, no extra markup — just clean lyric lines

