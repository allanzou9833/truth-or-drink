import { Injectable } from '@angular/core';
import { Card } from '../../models/card';
import { Observable, of } from 'rxjs';
import { DECK_NAMES } from '../../constants/deck';

import otrJson from '../../../assets/On-the-rocks.json';
import lcJson from '../../../assets/Last-call.json';
import hhJson from '../../../assets/Happy-hour.json';
import edJson from '../../../assets/Extra-dirty.json';

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
    const lcDeck = lcJson.map(c => new Card(c.id, c.questions));
    const hhDeck = hhJson.map(c => new Card(c.id, c.questions));
    const edDeck = edJson.map(c => new Card(c.id, c.questions));
    
    this.decks[DECK_NAMES.ON_THE_ROCKS] = otrDeck;
    this.decks[DECK_NAMES.LAST_CALL] = lcDeck;
    this.decks[DECK_NAMES.HAPPY_HOUR] = hhDeck;
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
