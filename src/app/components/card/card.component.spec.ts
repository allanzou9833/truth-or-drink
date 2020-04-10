import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { CardsService } from '../../services/cards/cards.service';
import { FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { DECK_NAMES } from '../../constants/deck';
import { Card } from '../../models/card';
import { OneQuestionComponent } from './one-question/one-question.component';
import { TwoQuestionsComponent } from './two-questions/two-questions.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardsService: CardsService;
  let filterByDeckSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ 
        CardComponent,
        OneQuestionComponent,
        TwoQuestionsComponent
      ],
      providers: [ CardsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    cardsService = fixture.debugElement.injector.get(CardsService);
    cardsService.InitCards();
    filterByDeckSpy = spyOn(cardsService, 'filterByDeck').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get new card', () => {
    const card = new Card('lc-3', ['A', 'B']);
    cardsService.cards.push(card);
    component.getCard();
    expect(component.card).toEqual(card);
  });

  it('should build the form controls for deck selection', () => {
    const controls = component.buildDeckControls();
    expect(controls).toEqual(jasmine.any(FormArray));
  });

  it('should filter decks acccording to selections', () => {
    const getCardSpy = spyOn(component, 'getCard').and.callThrough();
    const formValues = { decks: [true, true, false, false] };
    component.filterDecks(formValues);
    expect(component.newGame).toBeFalsy();
    expect(filterByDeckSpy).toHaveBeenCalledWith([
      DECK_NAMES.ON_THE_ROCKS,
      DECK_NAMES.LAST_CALL
    ]);
    expect(getCardSpy).toHaveBeenCalled();
  });

  it('should return the form controls for checkboxes', () => {
    const controls = component.deckControls;
    expect(controls).toEqual(jasmine.any(FormArray));
  });
});
