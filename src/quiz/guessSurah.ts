import { z } from "zod";
import {
  getManyVerseIdBySurahId,
  getSurahBySurahId,
  getSurahByVerseId,
  getVerseTextById,
} from "~/data";
import { randomizeOptions } from "~/quiz/helpers";
import { GuessVerse } from "~/quiz/types";
import { sort } from "~/utils/sort";
import { uniq } from "lodash";
import { pickOne } from "~/utils/pick";

const guessSurahBySurah = (props: GuessVerse) => {
  const schema = z.object({
    select: z
      .array(
        z
          .number({
            invalid_type_error: "Must be number",
          })
          .min(1, "Must be between 1 and 114")
          .max(114, "Must be between 1 and 114"),
      )
      .min(4, "Select at least one surah"),
    amount: z.number().min(1),
  });

  const parse = schema.parse({
    select: uniq(props.select),
    amount: props.amount,
  });

  const { select, amount } = parse;

  const verses = getManyVerseIdBySurahId(select);

  const data = [];

  const createQuiz = (): CreateQuizOutput => {
    const questionVerseId = pickOne(verses);
    const answerSurah = getSurahByVerseId(questionVerseId);

    // remove answerSurah from options
    let options = select.filter((surahId) => surahId !== answerSurah.id);

    // random and get only 3 from removeSurahOption
    options = options.sort(() => 0.5 - Math.random()).slice(0, 3);

    return randomizeOptions({
      question: getVerseTextById(questionVerseId),
      options: [
        ...options.map((option) => {
          return {
            text: getSurahBySurahId(option).name,
            value: 0,
          };
        }),
        {
          text: answerSurah.name,
          value: 1,
        },
      ],
    });
  };

  for (let i = 0; i < amount; i++) {
    data.push(createQuiz());
  }

  return {
    data,
    meta: {
      type: "guessSurahBySurah",
      select: sort(select),
      amount,
    },
  };
};

type CreateQuizOutput = {
  question: string;
  options: {
    text: string;
    value: number;
  }[];
};

export const guessSurah = {
  bySurah: guessSurahBySurah,
  // byJuz: guessVerseByJuz,
};
