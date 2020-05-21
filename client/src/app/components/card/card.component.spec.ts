import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockHelper } from 'ng-mocks';
import { of } from 'rxjs';

import { CardComponent } from './card.component';
import { OneQuestionComponent } from './one-question/one-question.component';
import { TwoQuestionsComponent } from './two-questions/two-questions.component';
import { SocketService } from '../../services/socket/socket.service';
import { Card } from '../../models/card.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let socketService: jasmine.SpyObj<SocketService>;
  
  const twoQuestionCard = new Card('ed-1', ['a', 'b']);

  beforeEach(async(() => {
    socketService = jasmine.createSpyObj<SocketService>('SocketService', [
      'getCard$',
      'newCard'
    ]);
    
    socketService.getCard$.and.returnValue(of(twoQuestionCard));

    TestBed.configureTestingModule({
      declarations: [ 
        CardComponent,
        MockComponent(OneQuestionComponent),
        MockComponent(TwoQuestionsComponent)
      ],
      providers: [
        { provide: SocketService, useValue: socketService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get new card', () => {
    component.getCard();
    expect(socketService.newCard).toHaveBeenCalled();
  });

  it('should send correct value to TwoQuestionsComponent', () => {
    const mockTwoQuestionsComponent = MockHelper.findOrFail<TwoQuestionsComponent>(
      fixture.debugElement,
      TwoQuestionsComponent
    ).componentInstance;
    
    expect(mockTwoQuestionsComponent.card).toEqual(twoQuestionCard);
  });

  describe('OneQuestion Tests: ', () => {
    const oneQuestionCard = new Card('ed-2', ['a']);
    beforeEach(() => {
      socketService.getCard$.and.returnValue(of(oneQuestionCard));
      
      fixture = TestBed.createComponent(CardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should send correct value to OneQuestionComponent', () => {
      const mockOneQuestionComponent = MockHelper.findOrFail<OneQuestionComponent>(
        fixture.debugElement,
        OneQuestionComponent
      ).componentInstance;
      
      expect(mockOneQuestionComponent.card).toEqual(oneQuestionCard);
    })
  });
});
