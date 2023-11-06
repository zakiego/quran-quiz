# Quran Quiz

`quran-quiz` is a library for generating quizzes about the Quran. This library is designed to enhance Quranic memorization.

Read the docs at [quran.zakiego.com](https://quran.zakiego.com/).

## Features

- [x] [Guess Verse by Surah](https://quran.zakiego.com/guess-verse#guess-verse-by-surah)
- [x] [Guess Verse by Juz](https://quran.zakiego.com/guess-verse#guess-verse-by-juz)
- [x] [Guess Surah by Surah](https://quran.zakiego.com/guess-surah#guess-surah-by-surah)
- [ ] Guess Surah by Juz

## Installation

```bash
npm install quran-quiz
```

## Example

### Request

```ts
import { guessSurah } from "quran-quiz";

const data = await guessSurah.bySurah({
  amount: 3,
  select: [111, 112, 113, 114],
});
```

### Response

When the `options.value` is set to 1, it means the answer is correct, while when the `options.value` is set to 0, it means the answer is incorrect.

```json
{
  "data": [
    {
      "question": {
        "text": " قُلْ هُوَ ٱللَّهُ أَحَدٌ",
        "verseKey": "112:1"
      },
      "options": [
        {
          "text": "Al-Masad",
          "value": 0
        },
        {
          "text": "Al-Falaq",
          "value": 0
        },
        {
          "text": "An-Nas",
          "value": 0
        },
        {
          "text": "Al-Ikhlas",
          "value": 1
        }
      ]
    }
    // ...
  ],
  "meta": {
    "type": "guessSurahBySurah",
    "select": [111, 112, 113, 114],
    "amount": 3
  }
}
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://zakiego.com"><img src="https://avatars.githubusercontent.com/u/78015359?v=4?s=100" width="100px;" alt="M. Zakiyuddin Munziri"/><br /><sub><b>M. Zakiyuddin Munziri</b></sub></a><br /><a href="#test-zakiego" title="Tests">⚠️</a> <a href="#code-zakiego" title="Code">💻</a> <a href="#doc-zakiego" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://iamyuu.dev"><img src="https://avatars.githubusercontent.com/u/45778229?v=4?s=100" width="100px;" alt="Yusuf"/><br /><sub><b>Yusuf</b></sub></a><br /><a href="#code-iamyuu" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
