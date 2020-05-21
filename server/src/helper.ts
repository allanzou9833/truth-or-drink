export function makeid(length): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getPlayers(io: SocketIO.Server, room: string): string[] {
  const clients = Object.keys(io.sockets.adapter.rooms[room].sockets);
  return clients.map(socketId => io.sockets.connected[socketId]['playerName']);
}