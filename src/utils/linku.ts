import { Fonts, Words } from "@kulupu-linku/sona";

const WORDS = "https://api.linku.la/v1/words?lang=en";
const SANDBOX_WORDS = "https://api.linku.la/v1/sandbox?lang=en";
const FONTS = "https://api.linku.la/v1/fonts";

let wordsPromise: Promise<Words> | null = null;
let fontsPromise: Promise<Fonts> | null = null;

async function fetchWordsData(): Promise<Words> {
  const linkuData = await fetch(WORDS);
  const linkuWords = JSON.parse(await linkuData.text());

  const sandboxData = await fetch(SANDBOX_WORDS);
  const sandboxWords = JSON.parse(await sandboxData.text());

  const merged = { ...linkuWords, ...sandboxWords };
  return merged;
}

async function fetchFontsData(): Promise<Fonts> {
  const linkuData = await fetch(FONTS);
  const linkuFonts = JSON.parse(await linkuData.text());

  return linkuFonts;
}

export async function getWords() {
  if (!wordsPromise) {
    wordsPromise = fetchWordsData();
  }
  const data = await wordsPromise;
  return data;
}

export async function getFonts() {
  if (!fontsPromise) {
    fontsPromise = fetchFontsData();
  }
  const data = await fontsPromise;
  return data;
}

export async function getLinkuCategories(word: string) {
  if (!wordsPromise) {
    wordsPromise = fetchWordsData();
  }
  const data = await wordsPromise;

  const classes = [];

  if (Object.prototype.hasOwnProperty.call(data, word)) {
    // TODO: what about duplicate words?
    const book = data[word].book.replace(/\s+/g, "-");
    const category = data[word].usage_category;
    classes.push(book, category);
  } else {
    classes.push("unknown");
  }

  return classes;
}
