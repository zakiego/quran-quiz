interface GuessVerse {
    select: number[];
    amount: number;
}
declare const guessVerse: {
    byChapter: (props: GuessVerse) => {
        data: {
            question: string;
            options: {
                text: string;
                value: number;
            }[];
        }[];
        meta: {
            type: string;
            select: number[];
            amount: number;
        };
    };
    byJuz: (props: GuessVerse) => {
        data: {
            question: string;
            options: {
                text: string;
                value: number;
            }[];
        }[];
        meta: {
            type: string;
            select: number[];
            amount: number;
        };
    };
};

export { guessVerse };
