import { z } from "zod";
import data from "~/data/quran.json";

export const quranSchema = z.object({
  id: z.number(),
  verse_number: z.number(),
  verse_key: z.string(),
  juz_number: z.number(),
  hizb_number: z.number(),
  rub_el_hizb_number: z.number(),
  ruku_number: z.number(),
  manzil_number: z.number(),
  sajdah_number: z.nullable(z.number()),
  chapter_id: z.number(),
  text_imlaei: z.string(),
  text_uthmani: z.string(),
  page_number: z.number(),
});

export type Quran = z.infer<typeof quranSchema>;

export const getQuran = () => {
  const parse = z
    .object({
      verses: z.array(quranSchema),
    })
    .safeParse(data);

  if (!parse.success) {
    throw new Error("Failed to parse data");
  }

  return parse.data.verses;
};

export const getManyVerseIdBySurahId = (select: number[]) => {
  return getQuran().reduce((result: number[], item) => {
    if (select.includes(item.chapter_id)) {
      result.push(item.id);
    }
    return result;
  }, []);
};

export const getManyVerseIdByJuzId = (select: number[]) => {
  return getQuran().reduce((result: number[], item) => {
    if (select.includes(item.juz_number)) {
      result.push(item.id);
    }
    return result;
  }, []);
};

export const getVerseTextById = (id: number) => {
  const find = getQuran().find((item) => item.id === id);

  if (!find) {
    throw new Error("Failed to find verse");
  }

  return find.text_uthmani;
};

export const getVerseKeyById = (id: number) => {
  const find = getQuran().find((item) => item.id === id);

  if (!find) {
    throw new Error("Failed to find verse");
  }

  return find.verse_key;
}

const chapterNames = [
  "Al-Fatihah",
  "Al-Baqarah",
  "Ali 'Imran",
  "An-Nisa",
  "Al-Ma'idah",
  "Al-An'am",
  "Al-A'raf",
  "Al-Anfal",
  "At-Tawbah",
  "Yunus",
  "Hud",
  "Yusuf",
  "Ar-Ra'd",
  "Ibrahim",
  "Al-Hijr",
  "An-Nahl",
  "Al-Isra",
  "Al-Kahf",
  "Maryam",
  "Taha",
  "Al-Anbya",
  "Al-Hajj",
  "Al-Mu'minun",
  "An-Nur",
  "Al-Furqan",
  "Ash-Shu'ara",
  "An-Naml",
  "Al-Qasas",
  "Al-'Ankabut",
  "Ar-Rum",
  "Luqman",
  "As-Sajdah",
  "Al-Ahzab",
  "Saba",
  "Fatir",
  "Ya-Sin",
  "As-Saffat",
  "Sad",
  "Az-Zumar",
  "Ghafir",
  "Fussilat",
  "Ash-Shuraa",
  "Az-Zukhruf",
  "Ad-Dukhan",
  "Al-Jathiyah",
  "Al-Ahqaf",
  "Muhammad",
  "Al-Fath",
  "Al-Hujurat",
  "Qaf",
  "Adh-Dhariyat",
  "At-Tur",
  "An-Najm",
  "Al-Qamar",
  "Ar-Rahman",
  "Al-Waqi'ah",
  "Al-Hadid",
  "Al-Mujadila",
  "Al-Hashr",
  "Al-Mumtahanah",
  "As-Saf",
  "Al-Jumu'ah",
  "Al-Munafiqun",
  "At-Taghabun",
  "At-Talaq",
  "At-Tahrim",
  "Al-Mulk",
  "Al-Qalam",
  "Al-Haqqah",
  "Al-Ma'arij",
  "Nuh",
  "Al-Jinn",
  "Al-Muzzammil",
  "Al-Muddaththir",
  "Al-Qiyamah",
  "Al-Insan",
  "Al-Mursalat",
  "An-Naba",
  "An-Nazi'at",
  "'Abasa",
  "At-Takwir",
  "Al-Infitar",
  "Al-Mutaffifin",
  "Al-Inshiqaq",
  "Al-Buruj",
  "At-Tariq",
  "Al-A'la",
  "Al-Ghashiyah",
  "Al-Fajr",
  "Al-Balad",
  "Ash-Shams",
  "Al-Layl",
  "Ad-Duhaa",
  "Ash-Sharh",
  "At-Tin",
  "Al-'Alaq",
  "Al-Qadr",
  "Al-Bayyinah",
  "Az-Zalzalah",
  "Al-'Adiyat",
  "Al-Qari'ah",
  "At-Takathur",
  "Al-'Asr",
  "Al-Humazah",
  "Al-Fil",
  "Quraysh",
  "Al-Ma'un",
  "Al-Kawthar",
  "Al-Kafirun",
  "An-Nasr",
  "Al-Masad",
  "Al-Ikhlas",
  "Al-Falaq",
  "An-Nas",
];

export const getSurahByVerseId = (verseId: number) => {
  const findVerseId = getQuran().find((item) => item.id === verseId);

  if (!findVerseId) {
    throw new Error("Failed to find verse");
  }

  return {
    id: findVerseId.chapter_id,
    name: chapterNames[findVerseId.chapter_id - 1],
  };
};

export const getSurahBySurahId = (surahId: number) => {
  return {
    id: surahId,
    name: chapterNames[surahId - 1],
  };
};
