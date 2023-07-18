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

export const getData = () => {
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

export const getManyVerseIdBySurah = (select: number[]) => {
  return getData().reduce((result: number[], item) => {
    if (select.includes(item.chapter_id)) {
      result.push(item.id);
    }
    return result;
  }, []);
};

export const getManyVerseIdByJuz = (select: number[]) => {
  return getData().reduce((result: number[], item) => {
    if (select.includes(item.juz_number)) {
      result.push(item.id);
    }
    return result;
  }, []);
};

export const getVerseTextById = (id: number) => {
  const find = getData().find((item) => item.id === id);

  if (!find) {
    throw new Error("Failed to find verse");
  }

  return find.text_uthmani;
};
