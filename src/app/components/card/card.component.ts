import { Component } from '@angular/core';
import { Card } from '../../models/card';
import { CardsService } from '../../services/cards/cards.service';
import { DECK_NAMES } from '../../constants/deck';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  card: Card;
  newGame: boolean = true;
  decks: { name: string, selected: boolean }[] = [
    { name: DECK_NAMES.ON_THE_ROCKS, selected: true },
    { name: DECK_NAMES.LAST_CALL, selected: true },
    { name: DECK_NAMES.HAPPY_HOUR, selected: true },
    { name: DECK_NAMES.EXTRA_DIRTY, selected: true }
  ]

  form: FormGroup = this.fb.group({
    decks: this.buildDeckControls()
  });

  constructor(
    private cardsService: CardsService,
    private fb: FormBuilder
  ) { }

  getCard(): void {
    this.cardsService.getCard().subscribe(card => this.card = card);
  }

  buildDeckControls(): FormArray {
    const arr = this.decks.map(deck => this.fb.control(deck.selected));
    return this.fb.array(arr);
  }

  filterDecks(value: { decks: boolean[]}) {
    this.newGame = false;
    let selectedDecks: string[] = [];
    value.decks.forEach((selected, i) => {
      if(selected)
        selectedDecks.push(this.decks[i].name);
    });
    this.cardsService.filterByDeck(selectedDecks);
    this.getCard();
  }

  get deckControls() {
    return this.form.get('decks');
  }
}
