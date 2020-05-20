import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLobby: boolean = false;
  
  constructor(private socketService: SocketService) { }

  createRoom(playerName: string): void {
    this.socketService.createRoom(playerName);
    this.showLobby = true;
  }

  joinLobby(playerName: string): void {
    this.socketService.joinRoom(playerName);
    this.showLobby = true;
  }
}
