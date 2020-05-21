export interface Game {
  room: string,
  decks: {[deckName: string]: boolean}
}