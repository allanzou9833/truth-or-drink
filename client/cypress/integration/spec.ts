import {
  selectors as _,
  dataSelector,
  verifyElementsExist,
  verifyElementsDontExist,
  roomLinkIsValid,
  playerDisplayIsCorrect,
  deckDisplayIsCorrect,
  createRoom, 
  clickStartGameBtn,
  clickDeckSelect,
  setupSocketioFailure
} from './util';

it('User can create a room', () => {
  setupSocketioFailure('/');

  verifyElementsExist([_.INPUT_NAME, _.BTN_CREATE]);
  verifyElementsDontExist([_.BTN_JOIN]);
  //   cy.focused().should('have.id', 'name');

  const playerName = 'Agust D';
  createRoom(playerName);

  verifyElementsExist([
    _.ROOM_LINK, 
    _.BTN_COPY, 
    _.DISPLAY_PLAYERS, 
    _.DISPLAY_DECKS, 
    _.BTN_START
  ]);

  roomLinkIsValid();
  playerDisplayIsCorrect([playerName]);
  deckDisplayIsCorrect();
});

describe('After room creation', () => {
  beforeEach(() => {
    setupSocketioFailure('/');
    createRoom('Agust D');
    cy.wait(500);
  });

  it('User can select decks to play with', () => {
    clickDeckSelect(1);
    cy.get('@deck_1').should('have.class', 'enabled');

    clickDeckSelect(0);
    cy.get('@deck_0').should('not.have.class', 'enabled');
  });

  it('User can start a game', () => {
    clickStartGameBtn();
    verifyElementsExist([
      _.CARD,
      _.BTN_NEW_GAME,
      _.BTN_NEXT
    ]);
  });

  // it('User can get next card', () => {

  // });

  // it('User can restart', () => {
    
  // });

  // it('Correct elements displayed when no cards left', () => {

  // });
})

// describe('When page is visited w/ room code', () => {
//   beforeEach(() => {
//     cy.visit('/?abdefgh');
//   });

//   it('should show name input, join room button, and create room button', () => {
//     verifyElementsExist([_.INPUT_NAME, _.BTN_JOIN, _.BTN_CREATE]);
//     //   cy.focused().should('have.id', 'name');
//   });

//   // it('should join room', () => {

//   // });
// });