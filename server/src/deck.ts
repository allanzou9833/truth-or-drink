import otr from '../decks/On-the-rocks.json';
import ed from '../decks/Extra-dirty.json';
import lc from '../decks/Last-call.json';
import hh from '../decks/Happy-hour.json';

const DECK_NAMES = {
  ON_THE_ROCKS: "On The Rocks",
  LAST_CALL: "Last Call",
  HAPPY_HOUR: "Happy Hour",
  EXTRA_DIRTY: "Extra Dirty"
}

class Deck {
  decks: {[deckName: string]: boolean};
  cards: string[];
  constructor() {
    // const initialDecks = Object.values(DECK_NAMES).reduce((obj, curr) => ({...obj, [curr]: true}), {});
    const initialDecks = Object.values(DECK_NAMES).reduce((obj, curr) => {
      obj[curr] = curr === DECK_NAMES.ON_THE_ROCKS ? true : false;
      return obj;
    }, {});
    this.updateDecks(initialDecks);
  }

  getCard(): {id: string, questions: string[]} {
    const id = this.cards.shift();
    let card;
    if(id) {
      const deckTag = id.split('-')[0];
      switch(deckTag) {
        case 'otr':
          card = otr[id];
          break;
        case 'ed':
          card = ed[id];
          break;
        case 'lc':
          card = lc[id];
          break;
        case 'hh':
          card = hh[id];
          break;
      }
    }
    return card;
  }

  updateDecks(selectedDecks: {[deckName: string]: boolean}): void {
    this.decks = selectedDecks;
    this.cards = this.shuffle(Object.entries(this.decks).reduce((map, [key, value]) => {
      if(!value) return map; 
      switch(key) {
        case DECK_NAMES.ON_THE_ROCKS:
          map = [...map, ...Object.keys(otr)]
          break;
        case DECK_NAMES.EXTRA_DIRTY:
          map = [...map, ...Object.keys(ed)]
          break;
        case DECK_NAMES.LAST_CALL:
          map = [...map, ...Object.keys(lc)]
          break;
        case DECK_NAMES.HAPPY_HOUR:
          map = [...map, ...Object.keys(hh)]
          break;
      }
      return map;
    }, []));
  }

  /**
  * Shuffles array in place. ES6 version
  * @param {Array} a items An array containing the items.
  */
  private shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

export default Deck;