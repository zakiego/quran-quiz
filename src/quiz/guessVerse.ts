import { z } from "zod";
import { getManyVerseIdByChapter, getVerseTextById } from "~/data";
import { createQuiz, getIndexOfQuestionAnswerOptions } from "~/quiz/helpers";
import { sort } from "~/utils/sort";

interface GuessVerse {
  select: number[];
  amount: number;
}

const guessVerseByChapter = (props: GuessVerse) => {
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
      .min(1, "Select at least one chapter"),
    amount: z.number().min(1),
  });

  const parse = schema.parse(props);

  const { select, amount } = parse;

  const verses = getManyVerseIdByChapter(select);

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
      type: "guessVerseByChapter",
      select: sort(select),
      amount,
    },
  };
};

export const guessVerse = {
  byChapter: guessVerseByChapter,
};
