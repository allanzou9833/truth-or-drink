import Deck from './deck';
import { makeid, getPlayers } from './helper';
import { Game } from './types';

const app = require('http').createServer();
const io: SocketIO.Server = require('socket.io')(app);
const port = process.env.PORT || 3000;

app.listen(port);

let state: {[room: string]: {deck: Deck, newGame: boolean}} = {};

io.on('connection', (socket: SocketIO.Socket) => {
  socket.on('disconnect', (reason) => {
    if(io.sockets.adapter.rooms[socket['room']]) {
      const players = getPlayers(io, socket['room']);
      io.to(socket['room']).emit('players', players);
    }
  });

  socket.on('start game', (room: string) => {
    if(state[room]) {
      state[room].newGame = false;
      io.to(room).emit('start game');
      const card = state[room].deck.getCard();
      io.to(room).emit('card', card);
    }
  })

  socket.on('restart', (room: string) => {
    if(state[room]) {
      state[room].newGame = true;
      io.to(room).emit('restart');
    }
  })

  socket.on('update decks', ({room, decks}: Game) => {
    if(state[room]) {
      state[room].deck.updateDecks(decks);
      io.to(room).emit('decks', state[room].deck.decks);
    }
  });

  socket.on('new card', (room: string) => {
    if(state[room]) {
      const card = state[room].deck.getCard();
      io.to(room).emit('card', card);
    }
  });

  socket.on('join', ({room, playerName}: {room:string, playerName: string}) => {
    if(state[room]) {
      socket.join(room);
      socket.emit('room id', room);

      socket.emit('decks', state[room].deck.decks);
      if(!state[room].newGame)
      socket.emit('start game');
      
      socket['playerName'] = playerName;
      socket['room'] = room;
      
      const players = getPlayers(io, room);
      io.to(room).emit('players', players);
    }
  });

  socket.on('create room', (playerName: string) => {
    const room = makeid(7);
    socket.join(room);
    socket.emit('room id', room);
    state[room] = {
      deck: new Deck(),
      newGame: true
    }
    socket.emit('decks', state[room].deck.decks);

    socket['playerName'] = playerName;
    socket['room'] = room;

    const players = getPlayers(io, room);
    socket.emit('players', players);
  });
});