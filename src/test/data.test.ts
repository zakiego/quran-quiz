import {
  getManyVerseIdBySurahId,
  getQuran,
  getSurahBySurahId,
  getSurahByVerseId,
  getVerseTextById,
} from "~/data";

describe("getData", () => {
  it("should return array of data from quran.json with length 6236", () => {
    const data = getQuran();
    expect(data).toHaveLength(6236);
  });
});

describe("getManyVersesIdBySurah", () => {
  it("should return array of id", () => {
    const data = getManyVerseIdBySurahId([1, 2]);
    expect(data).toHaveLength(7 + 286);
  });
});

describe("getVerseTextById", () => {
  it("should return text", () => {
    const data = getVerseTextById(2);
    expect(data).toBe("ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ");
  });
});

describe("getSurahByVerseId", () => {
  it("should return surah", () => {
    const data = getSurahByVerseId(10);
    expect(data).toEqual({
      id: 2,
      name: "Al-Baqarah",
    });
  });
});

describe("getSurahBySurahId", () => {
  it("should return surah", () => {
    const data = getSurahBySurahId(2);
    expect(data).toEqual({
      id: 2,
      name: "Al-Baqarah",
    });
  });
});
