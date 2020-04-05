import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { CardsService } from '../../services/cards/cards.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  cards: Card[];
  constructor(private cardsService: CardsService) { }

  ngOnInit() {
    this.getCards();
    console.log(this.cards);
  }

  getCards(): void {
    this.cardsService.getAllCards().subscribe(cards => this.cards = cards);
  }
}
