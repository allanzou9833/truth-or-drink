import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  playerName: string = '';
  @Input() showJoinBtn: boolean;
  @Output() joinLobby: EventEmitter<string> = new EventEmitter();
  @Output() createRoom: EventEmitter<string> = new EventEmitter();
}
