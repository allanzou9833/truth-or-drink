import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockHelper } from 'ng-mocks';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { DECK_NAMES } from '../../constants/deck';
import { LobbyComponent } from './lobby.component';
import { CardComponent } from '../card/card.component';
import { SocketService } from '../../services/socket/socket.service';

describe('LobbyComponent', () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;
  let socketService: jasmine.SpyObj<SocketService>;

  const players: string[] = ['Everglow', 'Chungha', 'IU'];
  const room: string = 'akd02KW';
  const decks: {[deck: string]: boolean} = {
    [DECK_NAMES.ON_THE_ROCKS]: false,
    [DECK_NAMES.HAPPY_HOUR]: false,
    [DECK_NAMES.EXTRA_DIRTY]: true,
    [DECK_NAMES.LAST_CALL]: true
  };
  const newGame: boolean = true;

  beforeEach(async(() => {
    socketService = jasmine.createSpyObj<SocketService>('SocketService', [ 
      'getPlayers$', 
      'getRoom$', 
      'getDecks$', 
      'getNewGame$', 
      'updateDecks', 
      'startGame',
      'restart'
    ]);

    socketService.getPlayers$.and.returnValue(of(players))
    socketService.getRoom$.and.returnValue(of(room));
    socketService.getDecks$.and.returnValue(of(decks));
    socketService.getNewGame$.and.returnValue(of(newGame));
    
    TestBed.configureTestingModule({
      declarations: [ 
        LobbyComponent,
        MockComponent(CardComponent)
      ],
      providers: [
        { provide: SocketService, useValue: socketService }
      ]
    })
    .compileComponents();
  }));
 
  describe('Function Tests: ', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(LobbyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should update selected decks', () => {
      const deckName = DECK_NAMES.EXTRA_DIRTY;
      const updatedDecks = {...decks};
      updatedDecks[deckName] = !updatedDecks[deckName];
  
      component.onDeckSelection(deckName);
      expect(component.selectedDecks[deckName]).toBe(updatedDecks[deckName]);
      expect(socketService.updateDecks).toHaveBeenCalledWith(updatedDecks);
    });
  
    it('should start game', () => {
      component.startGame();
      expect(socketService.startGame).toHaveBeenCalled();
    });
  
    it('should restart the game', () => {
      component.restart();
      expect(socketService.restart).toHaveBeenCalled();
      expect(socketService.updateDecks).toHaveBeenCalledWith(decks);
    });
  
    it('should return correct link', () => {
      const url = `${environment.clientUrl}/?${room}`;
      expect(component.roomLink).toBe(url);
    });
  });

  describe('Ouput Event Tests: ', () => {
    beforeEach(() => {
      socketService.getNewGame$.and.returnValue(of(false));
      fixture = TestBed.createComponent(LobbyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
    it('should call restart when CardComponent emits on restart', () => {
      spyOn(component, 'restart');
      const mockCardComponent = MockHelper.findOrFail(
        fixture.debugElement,
        CardComponent
      ).componentInstance;
  
      mockCardComponent.restart.emit();
  
      expect(component.restart).toHaveBeenCalled();
    });
  })
});
