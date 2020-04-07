import { Component } from '@angular/core';
import { Card } from '../../models/card';
import { CardsService } from '../../services/cards/cards.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  card: Card;
  newGame: boolean = true;

  constructor(private cardsService: CardsService) { }

  getCard(): void {
    if(this.newGame)
      this.newGame = false;
    this.cardsService.getCard().subscribe(card => this.card = card);
  }

  shuffleCards(): void {
    this.newGame = true;
    this.cardsService.shuffleCards();
  }
}
