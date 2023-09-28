import { guessSurah } from "~/quiz/guessSurah";
import { saveJsonToFile } from "~/utils/save";

describe("guessSurah by surah", () => {
  describe("input", () => {
    it("should error if select is empty", () => {
      expect(() =>
        guessSurah.bySurah({ select: [], amount: 1 }),
      ).toThrowError();
    });

    it("should error if select is not number", () => {
      expect(() =>
        // @ts-expect-error
        guessSurah.bySurah({ select: [1, 2, "3"], amount: 1 }),
      ).toThrowError();
    });

    it("should error if select is not between 1 and 114", () => {
      expect(() =>
        guessSurah.bySurah({ select: [1, 2, 115], amount: 1 }),
      ).toThrowError();
    });

    it("should error if amount is empty", () => {
      // @ts-expect-error
      expect(() => guessSurah.bySurah({ select: [1] })).toThrowError();
    });

    it("should error if amount is not number", () => {
      expect(() =>
        // @ts-expect-error
        guessSurah.bySurah({ select: [1], amount: "1" }),
      ).toThrowError();
    });

    it("should error if amount is less than 1", () => {
      expect(() =>
        guessSurah.bySurah({ select: [1], amount: 0 }),
      ).toThrowError();
    });

    it("should error if select is less than 4", () => {
      expect(() =>
        guessSurah.bySurah({ select: [1, 2, 3], amount: 1 }),
      ).toThrowError();
    });

    it("should error if select is less than 4 after remove duplicates", () => {
      expect(() =>
        guessSurah.bySurah({ select: [1, 2, 3, 3], amount: 1 }),
      ).toThrowError();
    });
  });

  describe("output", () =>
    it("should return data and meta", () => {
      const result = guessSurah.bySurah({
        select: [6, 5, 3, 8, 8, 8],
        amount: 6,
      });

      saveJsonToFile(result);

      expect(result).toHaveProperty("data");
      expect(result).toHaveProperty("meta");

      expect(result.data).toHaveLength(6);
      expect(result.data[0].options).toHaveLength(4);
      expect(result.data[0].options[0]).toString();

      expect(result.meta.amount).toBe(6);
      expect(result.meta.select).toEqual([3, 5, 6, 8]);
      expect(result.meta.type).toBe("guessSurahBySurah");
    }));
});

// describe("guessVerse by juz", () => {
//   describe("input", () => {
//     it("should error if select is empty", () => {
//       expect(() => guessVerse.byJuz({ select: [], amount: 1 })).toThrowError();
//     });

//     it("should error if select is not number", () => {
//       expect(() =>
//         // @ts-expect-error
//         guessVerse.byJuz({ select: [1, 2, "3"], amount: 1 }),
//       ).toThrowError();
//     });

//     it("should error if select is not between 1 and 30", () => {
//       expect(() =>
//         guessVerse.byJuz({ select: [1, 2, 115], amount: 1 }),
//       ).toThrowError();
//     });

//     it("should error if amount is empty", () => {
//       // @ts-expect-error
//       expect(() => guessVerse.byJuz({ select: [1] })).toThrowError();
//     });

//     it("should error if amount is not number", () => {
//       expect(() =>
//         // @ts-expect-error
//         guessVerse.byJuz({ select: [1], amount: "1" }),
//       ).toThrowError();
//     });

//     it("should error if amount is less than 1", () => {
//       expect(() => guessVerse.byJuz({ select: [1], amount: 0 })).toThrowError();
//     });
//   });

//   describe("output", () =>
//     it("should return data and meta", () => {
//       const result = guessVerse.byJuz({ select: [6, 5, 3], amount: 6 });

//       expect(result).toHaveProperty("data");
//       expect(result).toHaveProperty("meta");

//       expect(result.data).toHaveLength(6);

//       expect(result.meta.amount).toBe(6);
//       expect(result.meta.select).toEqual([3, 5, 6]);
//       expect(result.meta.type).toBe("guessVerseByJuz");
//     }));
// });
