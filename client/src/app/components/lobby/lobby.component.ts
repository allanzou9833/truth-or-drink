import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { DECK_NAMES } from '../../constants/deck';
import { environment } from '../../../environments/environment';
import { Decks } from '../../models/decks.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  newGame: boolean = true;
  clientUrl: string = environment.clientUrl;
  deckNames: string[] = Object.values(DECK_NAMES);
  selectedDecks: Decks = this.deckNames.reduce((obj, curr) => ({...obj, [curr]: false}), {});
  players: string[] = [];
  room: string = '';

  constructor(private socketService: SocketService) { }
  
  ngOnInit() {
    this.socketService.getPlayers$().subscribe(players => this.players = players);
    this.socketService.getRoom$().subscribe(room => this.room = room);
    this.socketService.getDecks$().subscribe(decks => this.selectedDecks = decks);
    this.socketService.getNewGame$().subscribe(newGame => this.newGame = newGame);
  }

  onDeckSelection(key: string) {
    this.selectedDecks[key] = !this.selectedDecks[key];
    this.socketService.updateDecks(this.selectedDecks);
  }
  
  startGame(): void {
    this.socketService.startGame();
  }

  restart(): void {
    this.socketService.restart();
    this.socketService.updateDecks(this.selectedDecks);
  }

  copyRoomLink(el: HTMLInputElement): void {
    el.select();
    document.execCommand('copy');
    el.setSelectionRange(0, 0);
  }

  get roomLink(): string {
    return `${this.clientUrl}?${this.room}`;
  }
}
