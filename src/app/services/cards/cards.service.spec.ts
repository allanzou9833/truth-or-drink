import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';
import { DECK_NAMES } from '../../constants/deck';
import { Card } from '../../models/card';

describe('CardsService', () => {
  let service: CardsService;
  let shuffleSpy: jasmine.Spy;
  beforeEach(async () => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    service = TestBed.get(CardsService);
    shuffleSpy = spyOn<any>(service, 'shuffle').and.callThrough();
  })

  it('should be created and create cards', () => {
    expect(service).toBeTruthy();
    expect(service.decks[DECK_NAMES.ON_THE_ROCKS].length).toBeGreaterThan(0);
    expect(service.decks[DECK_NAMES.EXTRA_DIRTY].length).toBeGreaterThan(0);
  });

  it('should return a card', done => {
    const card = new Card('lc-3', ['A', 'B']);
    service.cards.push(card);
    service.getCard().subscribe(c => {
      expect(c).toEqual(card);
      done();
    });
  });

  it('should filter by deck', () => {
    const selectedDecks = [DECK_NAMES.ON_THE_ROCKS, DECK_NAMES.LAST_CALL];
    service.filterByDeck(selectedDecks);
    const result = service.cards.every(card => {
      return selectedDecks.includes(card.deck)
    });
    expect(result).toBeTruthy();
    expect(shuffleSpy).toHaveBeenCalled();
  });
});
