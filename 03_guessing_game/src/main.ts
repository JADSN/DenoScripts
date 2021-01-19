import {
  bgBlue,
  bgRed,
  bold,
} from "https://deno.land/std@0.83.0/fmt/colors.ts";

import { rand } from "./random.ts";

console.log("==============");
console.log("GUESSING GAME");
console.log("==============");

const MIN = 0;
const MAX = 5;

const SECRETNUMBER = rand(MIN, MAX);
enum AnswerStatus {
  GREATHER,
  LESS,
  EQUAL,
}

function isCorrectAnswer(input: number): AnswerStatus {
  if (input > SECRETNUMBER) {
    return AnswerStatus.GREATHER;
  } else if (input < SECRETNUMBER) {
    return AnswerStatus.LESS;
  } else {
    return AnswerStatus.EQUAL;
  }
}

let flag = true;

while (flag) {
  const userInput = prompt(`Guess the Number[${MIN}-${MAX}]:`, "0")!;
  const userInputNumber = parseInt(userInput);
  const status = isCorrectAnswer(userInputNumber);

  switch (status) {
    case AnswerStatus.GREATHER:
      console.log(
        bgRed(bold(` THE SECRET NUMBER IS LESS THEN: ${userInputNumber} `)),
      );
      console.log();

      break;
    case AnswerStatus.LESS:
      console.log(
        bgRed(bold(` THE SECRET NUMBER IS GREATHER THEN: ${userInputNumber} `)),
      );
      console.log();
      break;
    case AnswerStatus.EQUAL:
      console.log(bgBlue(bold(" ACERTOU MISERÁVEL ")));
      console.log();
      flag = false;
      break;

    default:
      break;
  }
}
