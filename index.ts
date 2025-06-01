import axios from 'axios'
import * as cheerio from 'cheerio'
import * as fs from 'fs'

const fetchHTML = async (name: string): Promise<any> => {
    return (await axios.get(`https://genius.com/${name}-lyrics`)).data
}


const getPreloadedState = (html: string): Lyrics => {
  const $ = cheerio.load(html);
  let content = "";

  $("script").each((_, el) => {
    const scriptText = $(el).html();
    if (scriptText?.includes("window.__PRELOADED_STATE__ = JSON.parse")) {
      content = scriptText;
    }
  });

  if (!content) {
    console.error("find nothing");
    process.exit(1);
  }

  const match = content.match(/window\.__PRELOADED_STATE__\s*=\s*JSON\.parse\(\s*'((?:\\.|[^'\\])*)'\s*\)/s);
  if (!match) {
    console.error("can't find string by match pattern∑");
    process.exit(1);
  }

  const jsString = match[1];
  let state;
  try {
    const decoded = eval(`'${jsString}'`);
    state = JSON.parse(decoded);
  } catch (e) {
    console.error("wrong json format", e);
    process.exit(1);
  }

  return state;
};

function extractText(nodes: any[]): string[] {
  let result: string[] = [];

  for (const node of nodes) {
    if (typeof node === "string") {
      if (node.trim() !== ""){
        result.push(node)
      }
    } else if (Array.isArray(node)) {
      result.push(...extractText(node))
    } else if (node?.children) {
      result.push(...extractText(node.children))
    }
  }
  return result
}




//GetLyrics - function which can get any lyrics from the genuis.com
//right way to use name input:
//["name", "song-name"]
//example:
//const name : string[] = ["david-kushner", "daylight"]
export default async function GetLyrics (name: string[]) : Promise<any[]> {

  const refactoredName = `${name[0]}-${name[1]}`
  const html = await fetchHTML(refactoredName)
  const json : Lyrics = getPreloadedState(html) as Lyrics
  const lyricsNodes: any[] = json.songPage.lyricsData.body.children[0].children
  return extractText(lyricsNodes)
}


