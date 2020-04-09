import { DECK_NAMES } from '../constants/deck';

export class Card {
  id: string;
  deck: string;
  questionA: string;
  questionB?: string;
  numberOfQuestions: number;

  constructor(id: string, questions: string[]) {
    this.id = id;
    this.deck = deckMap[id.split('-')[0]];
    this.numberOfQuestions = questions.length;
    this.questionA = questions[0];
    this.questionB = questions.length > 1 ? questions[1] : '';
  }
}

const deckMap: { [name: string]: string} = {
  "otr": DECK_NAMES.ON_THE_ROCKS,
  "lc": DECK_NAMES.LAST_CALL,
  "ed": DECK_NAMES.EXTRA_DIRTY,
  "hh": DECK_NAMES.HAPPY_HOUR
}