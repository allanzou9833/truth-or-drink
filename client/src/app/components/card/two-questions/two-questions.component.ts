import { Component, Input } from '@angular/core';
import { Card } from '../../../models/card.model';
import { DECK_ICONS } from '../../../constants/deck';

@Component({
  selector: 'app-two-questions',
  templateUrl: './two-questions.component.html',
  styleUrls: ['./two-questions.component.scss']
})
export class TwoQuestionsComponent {
  @Input() card: Card;
  deckIcons = DECK_ICONS;
}
