import { Component, Input } from '@angular/core';
import { Card } from '../../../models/card.model';
import { DECK_ICONS } from '../../../constants/deck';

@Component({
  selector: 'app-one-question',
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.scss']
})
export class OneQuestionComponent {
  @Input() card: Card;
  deckIcons = DECK_ICONS;
}
