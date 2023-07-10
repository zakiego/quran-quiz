import { getIndexOfQuestionAnswerOptions } from "~/quiz/helpers";

describe("getIndexOfQuestionAnswerOptions", () => {
  it("should return error if numbers length is less than 5", () => {
    expect(() => getIndexOfQuestionAnswerOptions([1, 2, 3, 4])).toThrowError();
  });

  it("should return object with question, answer, and options", () => {
    const data = getIndexOfQuestionAnswerOptions([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(data).toHaveProperty("question");
    expect(data).toHaveProperty("answer");
    expect(data).toHaveProperty("options");
  });

  it("should return object with question, answer, and options with correct type", () => {
    const data = getIndexOfQuestionAnswerOptions([1, 2, 3, 4, 5, 6, 7, 8]);
    if (data === null) {
      throw new Error("Data is null");
    }
    expect(typeof data.question).toBe("number");
    expect(typeof data.answer).toBe("number");
    expect(Array.isArray(data.options)).toBe(true);
  });

  it("should return object with question, answer, and options with correct value", () => {
    const data = getIndexOfQuestionAnswerOptions([1, 2, 3, 4, 5, 6, 7, 8]);
    if (data === null) {
      throw new Error("Data is null");
    }
    expect(data.question).toBeGreaterThan(0);
    expect(data.answer).toBeGreaterThan(0);
    expect(data.options).toHaveLength(3);
  });
});
