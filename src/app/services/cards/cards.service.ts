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

  mapJsonToCard(): void {
    this.cards = this.otrDeck.map(c => new Card(c.id, c.questions));
  }

  getAllCards(): Observable<Card[]> {
    if (!this.cards)
      this.mapJsonToCard();
    return of(this.cards);
  }
}
