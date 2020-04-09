import { Injectable } from '@angular/core';
import otrJson from 'src/assets/On-the-rocks.json';
import edJson from 'src/assets/Extra-dirty.json';
import { Card } from '../../models/card';
import { Observable, of } from 'rxjs';
import { DECK_NAMES } from '../../constants/deck';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  decks: { [deckName: string]: Card[] } = {
    [DECK_NAMES.ON_THE_ROCKS]: [],
    [DECK_NAMES.LAST_CALL]: [],
    [DECK_NAMES.HAPPY_HOUR]: [],
    [DECK_NAMES.EXTRA_DIRTY]: []
  };
  cards: Card[] = [];

  constructor() {
    this.InitCards();
  }

  InitCards(): void {
    const otrDeck = otrJson.map(c => new Card(c.id, c.questions));
    const edDeck = edJson.map(c => new Card(c.id, c.questions));
    this.decks[DECK_NAMES.ON_THE_ROCKS] = otrDeck;
    this.decks[DECK_NAMES.EXTRA_DIRTY] = edDeck;
  }

  getCard(): Observable<Card> {
    const card = this.cards.pop();
    return of(card);
  }

  filterByDeck(decks: string[]): void {
    this.cards = [];
    decks.forEach(name => this.cards = [...this.cards, ...this.decks[name]]);
    this.shuffle(this.cards);
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
