import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Card } from '../../models/card.model';
import { Decks } from '../../models/decks.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: SocketIOClient.Socket;
  room: string;

  constructor() { 
    this.socket = io.connect(environment.serverUrl);
    if(window.location.search) {
      this.room = window.location.search.split('?')[1].split('=')[0];
    }
  }

  getNewGame$(): Observable<boolean> {
    return new Observable((subscriber) => {
      this.socket.on('start game', () => subscriber.next(false));
      this.socket.on('restart', () => subscriber.next(true));
    });
  }

  getDecks$(): Observable<Decks> {
    return new Observable((subscriber) => {
      this.socket.on('decks', (decks: Decks) => subscriber.next(decks));
    });
  }

  getCard$(): Observable<Card | void> {
    return new Observable((subscriber) => {
      this.socket.on('card', (card: {id: string, questions: string[]} | null) => {
        if(card) subscriber.next(new Card(card.id, card.questions));
        else subscriber.next(null);
      });
    })
  }

  getRoom$(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on('room id', (id: string) => {
        this.room = id;
        subscriber.next(id);
      });
    })
  }

  getPlayers$(): Observable<string[]> {
    return new Observable((subscriber) => {
      this.socket.on('players', (players: string[]) => subscriber.next(players))
    });
  }

  roomPropHasValue(): boolean {
    if(this.room) return true;
    return false;
  }

  newCard(): void {
    this.socket.emit('new card', this.room);
  }

  createRoom(playerName: string): void {
    this.socket.emit('create room', playerName);
  }
  
  joinRoom(playerName: string): void {
    this.socket.emit('join', { room: this.room, playerName });
  }

  updateDecks(selectedDecks: Decks): void {
    this.socket.emit('update decks', { room: this.room, decks: selectedDecks });
  }
  
  startGame(): void {
    this.socket.emit('start game', this.room);
  }

  restart(): void {
    this.socket.emit('restart', this.room);
  }
}
