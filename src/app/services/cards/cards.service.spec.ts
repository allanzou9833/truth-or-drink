import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize card data', () => {
    service.InitCards();
    expect(service.cards).toBeTruthy();
    expect(service.returnCards).toBeTruthy();
    expect(service.cards.length).toEqual(service.returnCards.length);
    expect(shuffleSpy).toHaveBeenCalled();
  });

  it('should return a card', () => {
    const initSpy = spyOn(service, 'InitCards').and.callThrough();
    const expectedKeys = ['id', 'deck', 'questionA', 'questionB', 'numberOfQuestions'].sort();
    let card;
    service.getCard().subscribe(c => card = c);
    expect(initSpy).toHaveBeenCalled();
    const actualKeys = Object.keys(card).sort();
    expect(actualKeys).toEqual(expectedKeys);
  });

  it('should shuffle the cards', () => {
    service.InitCards();
    service.shuffleCards();
    expect(service.returnCards.length).toEqual(service.cards.length);
    expect(shuffleSpy).toHaveBeenCalledTimes(2);
  });
});
