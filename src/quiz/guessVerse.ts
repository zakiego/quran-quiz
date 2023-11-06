import { uniq } from "lodash";
import { z } from "zod";
import {
  getManyVerseIdBySurahId,
  getManyVerseIdByJuzId,
  getVerseTextById,
  getVerseKeyById,
} from "~/data";
import {
  getIndexOfQuestionAnswerOptions,
  randomizeOptions,
} from "~/quiz/helpers";
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

  const parse = schema.parse({
    select: uniq(props.select),
    amount: props.amount,
  });

  const { select, amount } = parse;

  const verses = getManyVerseIdBySurahId(select);

  const data = [];

  for (let i = 0; i < amount; i++) {
    const { answer, options, question } =
      getIndexOfQuestionAnswerOptions(verses);

    const quiz = createGuessVerseQuiz({
      questionVerseId: question,
      answerVerseId: answer,
      optionsVerseId: options,
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

  const parse = schema.parse({
    select: uniq(props.select),
    amount: props.amount,
  });

  const { select, amount } = parse;

  const verses = getManyVerseIdByJuzId(select);

  const data = [];

  for (let i = 0; i < amount; i++) {
    const { answer, options, question } =
      getIndexOfQuestionAnswerOptions(verses);

    const quiz = createGuessVerseQuiz({
      questionVerseId: question,
      answerVerseId: answer,
      optionsVerseId: options,
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

interface CreateGuessVerseQuiz {
  questionVerseId: number;
  answerVerseId: number;
  optionsVerseId: number[];
}

const createGuessVerseQuiz = (props: CreateGuessVerseQuiz) => {
  const { questionVerseId, answerVerseId, optionsVerseId } = props;

  const result = {
    question: {
      text: getVerseTextById(questionVerseId),
      verseKey: getVerseKeyById(questionVerseId),
    },
    options: [
      ...optionsVerseId.map((option) => {
        return {
          text: getVerseTextById(option),
          value: 0,
          verseKey: getVerseKeyById(option),
        };
      }),
      {
        text: getVerseTextById(answerVerseId),
        value: 1,
        verseKey: getVerseKeyById(answerVerseId),
      },
    ],
  };

  return randomizeOptions(result);
};
