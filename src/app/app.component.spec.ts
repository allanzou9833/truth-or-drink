import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockComponent, MockHelper } from 'ng-mocks';

import { AppComponent } from './app.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { HomeComponent } from './components/home/home.component';
import { SocketService } from './services/socket/socket.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let socketService: jasmine.SpyObj<SocketService>;
  let mockHomeComponent: HomeComponent;

  beforeEach(async(() => {
    socketService = jasmine.createSpyObj<SocketService>('SocketService', [
      'createRoom', 
      'joinRoom', 
      'roomPropHasValue' 
    ]);

    socketService.roomPropHasValue.and.returnValue(true);

    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent,
        MockComponent(HomeComponent),
        MockComponent(LobbyComponent)
      ],
      providers: [
        { provide: SocketService, useValue: socketService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    mockHomeComponent = MockHelper.findOrFail(
      fixture.debugElement,
      HomeComponent
    ).componentInstance;
  });
  describe('Function Tests: ', () => {
    it('should create the app', () => {
      expect(component).toBeTruthy();
    });
  
    it('should create room', () => {
      const playerName = 'test';
      component.createRoom(playerName);
  
      expect(socketService.createRoom).toHaveBeenCalledWith(playerName);
      expect(component.showLobby).toBeTruthy();
    });
  
    it('should join room', () => {
      const playerName = 'test';
      component.joinLobby(playerName);
  
      expect(socketService.joinRoom).toHaveBeenCalledWith(playerName);
      expect(component.showLobby).toBeTruthy();
    });
  });
  
  describe('Input/Ouput Event Tests: ', () => {
    it('should call createRoom when HomeComponent emits on createRoom', () => {
      const playerName = 'test';
      spyOn(component, 'createRoom');
      
      mockHomeComponent.createRoom.emit(playerName);
  
      expect(component.createRoom).toHaveBeenCalledWith(playerName);
    });
  
    it('should call joinLobby when HomeComponent emits on joinLobby', () => {
      const playerName = 'test';
      spyOn(component, 'joinLobby');
  
      mockHomeComponent.joinLobby.emit(playerName);
  
      expect(component.joinLobby).toHaveBeenCalledWith(playerName);
    });
  
    it('should send correct value to HomeComponent showJoinBtn', () => {
      expect(mockHomeComponent.showJoinBtn).toBeTruthy();
    });
  });
});
