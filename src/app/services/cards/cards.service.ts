import { Injectable } from '@angular/core';
import otrJson from 'src/assets/On-the-rocks.json';
import { Card } from '../../models/card';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  otrDeck = otrJson;
  cards: Card[];
  returnCards: Card[];

  InitCards(): void {
    this.cards = this.otrDeck.map(c => new Card(c.id, c.questions));
    this.returnCards = [...this.cards];
    this.shuffle(this.returnCards);
  }

  getCard(): Observable<Card> {
    if(!this.cards)
      this.InitCards();
    const card = this.returnCards.pop();
    return of(card);
  }

  shuffleCards(): void {
    this.returnCards = [...this.cards];
    this.shuffle(this.returnCards);
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
