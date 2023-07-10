import { getData, getManyVerseIdByChapter, getVerseTextById } from "~/data";

describe("getData", () => {
  it("should return array of data from quran.json with length 6236", () => {
    const data = getData();
    expect(data).toHaveLength(6236);
  });
});

describe("getManyVersesIdByChapter", () => {
  it("should return array of id", () => {
    const data = getManyVerseIdByChapter([1, 2]);
    expect(data).toHaveLength(7 + 286);
  });
});

describe("getVerseTextById", () => {
  it("should return text", () => {
    const data = getVerseTextById(2);
    expect(data).toBe("ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ");
  });
});
