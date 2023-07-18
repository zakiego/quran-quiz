import { z } from "zod";
import {
  getManyVerseIdBySurah,
  getManyVerseIdByJuz,
  getVerseTextById,
} from "~/data";
import { createQuiz, getIndexOfQuestionAnswerOptions } from "~/quiz/helpers";
import { GuessVerse } from "~/quiz/types";
import { sort } from "~/utils/sort";

const guessVerseBySurah = (props: GuessVerse) => {
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
      .min(1, "Select at least one surah"),
    amount: z.number().min(1),
  });

  const parse = schema.parse(props);

  const { select, amount } = parse;

  const verses = getManyVerseIdBySurah(select);

  const data = [];

  for (let i = 0; i < amount; i++) {
    const { answer, options, question } =
      getIndexOfQuestionAnswerOptions(verses);

    const quiz = createQuiz({
      indexOf: {
        answer,
        options,
        question,
      },
      getter: getVerseTextById,
    });

    data.push(quiz);
  }

  return {
    data,
    meta: {
      type: "guessVerseBySurah",
      select: sort(select),
      amount,
    },
  };
};

const guessVerseByJuz = (props: GuessVerse) => {
  const schema = z.object({
    select: z
      .array(
        z
          .number({
            invalid_type_error: "Must be number",
          })
          .min(1, "Must be between 1 and 30")
          .max(30, "Must be between 1 and 30"),
      )

      .min(1, "Select at least one surah"),
    amount: z.number().min(1),
  });

  const parse = schema.parse(props);

  const { select, amount } = parse;

  const verses = getManyVerseIdByJuz(select);

  const data = [];

  for (let i = 0; i < amount; i++) {
    const { answer, options, question } =
      getIndexOfQuestionAnswerOptions(verses);

    const quiz = createQuiz({
      indexOf: {
        answer,
        options,
        question,
      },
      getter: getVerseTextById,
    });

    data.push(quiz);
  }

  return {
    data,
    meta: {
      type: "guessVerseByJuz",
      select: sort(select),
      amount,
    },
  };
};

export const guessVerse = {
  bySurah: guessVerseBySurah,
  byJuz: guessVerseByJuz,
};
