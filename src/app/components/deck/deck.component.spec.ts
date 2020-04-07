import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckComponent } from './deck.component';
import { CardsService } from '../../services/cards/cards.service';

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;
  let cardsService: CardsService;
  let shuffleSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckComponent ],
      providers: [ CardsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;

    cardsService = fixture.debugElement.injector.get(CardsService);
    shuffleSpy = spyOn(cardsService, 'shuffleCards').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get new card', () => {
    component.getCard();
    expect(component.newGame).toBeFalsy();
    expect(component.card).toBeTruthy();
  });

  it('should start a new game and shuffle cards', () => {
    component.getCard();
    component.newGame = false;
    component.shuffleCards();
    expect(component.newGame).toBeTruthy();
    expect(shuffleSpy).toHaveBeenCalled();
  });
});
