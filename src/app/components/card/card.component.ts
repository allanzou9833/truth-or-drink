import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from '../../models/card.model';
import { SocketService } from '../../services/socket/socket.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  card: Card | void;
  @Output() restart: EventEmitter<any> = new EventEmitter();

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getCard$().subscribe(card => {
      this.card = card;
    });
  }

  getCard(): void {
    this.socketService.newCard();
  }
}
