interface QuestionAnswerOptions {
  question: number;
  answer: number;
  options: number[];
}

export const getIndexOfQuestionAnswerOptions = (
  numbers: number[],
): QuestionAnswerOptions => {
  if (numbers.length < 5) {
    throw new Error("Not enough numbers");
  }

  const randomIndex = Math.floor(Math.random() * (numbers.length - 1)); // -1 to prevent out of bound
  const consecutiveNumbers: [number, number] = [
    numbers[randomIndex],
    numbers[randomIndex + 1],
  ];

  const remainingNumbers = numbers.filter(
    (_, index) => index !== randomIndex && index !== randomIndex + 1,
  );

  if (remainingNumbers.length < 3) {
    throw new Error("Not enough remaining numbers");
  }

  const randomNumbers: number[] = [];
  for (let i = 0; i < 3; i++) {
    const randomRemainingIndex = Math.floor(
      Math.random() * remainingNumbers.length,
    );
    randomNumbers.push(remainingNumbers[randomRemainingIndex]);
    remainingNumbers.splice(randomRemainingIndex, 1); // Remove the selected random number from the remaining numbers
  }

  return {
    question: consecutiveNumbers[0],
    answer: consecutiveNumbers[1],
    options: randomNumbers,
  };
};

export const randomizeOptions = (result: {
  question: string;
  options: { text: string; value: number }[];
}): {
  question: string;
  options: { text: string; value: number }[];
} => {
  const randomizedOptions = [...result.options];

  for (let i = randomizedOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomizedOptions[i], randomizedOptions[j]] = [
      randomizedOptions[j],
      randomizedOptions[i],
    ];
  }

  return { ...result, options: randomizedOptions };
};
