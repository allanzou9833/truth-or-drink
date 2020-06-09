import {
  selectors as _,
  clickBtn,
  roomLinkIsValid,
  playerDisplayIsCorrect,
  deckDisplayIsCorrect,
  createRoom, 
  joinRoom,
  clickDeckSelect,
  setupSocketioFailure,
  lobbyIsDisplayed,
  homeIsDisplayed,
  cardIsDisplayed,
  cardEmptyIsDisplayed,
} from '../support/util';

it('User can create a room', () => {
  setupSocketioFailure('/');

  homeIsDisplayed();

  const playerName = 'Agust D';
  createRoom(playerName);

  lobbyIsDisplayed();
  roomLinkIsValid()
  playerDisplayIsCorrect([playerName])
  deckDisplayIsCorrect()
});

describe('After room creation', () => {
  beforeEach(() => {
    setupSocketioFailure('/');
    createRoom('Agust D');
    cy.wait(1000);
  });

  it('User can select decks to play with', () => {
    clickDeckSelect(1, 'have.class', 'enabled');
    clickDeckSelect(0, 'not.have.class', 'enabled');
  });

  it('User can start a game', () => {
    clickBtn(_.BTN_START)
    cardIsDisplayed();
  });

  it('User can get next card', () => {
    clickBtn(_.BTN_START);
    cy.get('.card-question').then($firstCard => {
      const firstCardQuestion = $firstCard.text();

      clickBtn(_.BTN_NEXT);

      cy.get('.card-question').then($nextCard => {
        const nextCardQuestion = $nextCard.text();

        expect(firstCardQuestion).to.not.equal(nextCardQuestion);
      });
    });
  });

  it('Correct elements displayed when no cards left', () => {
    clickDeckSelect(0, 'not.have.class', 'enabled');
    clickBtn(_.BTN_START);
    cardEmptyIsDisplayed();
  });

  it('User can restart', () => {
    clickBtn(_.BTN_START);
    clickBtn(_.BTN_NEW_GAME);
    lobbyIsDisplayed();

    clickDeckSelect(0, 'not.have.class', 'enabled');
    clickBtn(_.BTN_START);
    clickBtn(_.BTN_RESTART);
    lobbyIsDisplayed();
  });
})

describe('When page is visited w/ room code', () => {
  beforeEach(() => {
    setupSocketioFailure('/?abcdefgh');
  });

  it('should join room', () => {
    homeIsDisplayed(true);
    const playerName = 'Chungha'
    joinRoom(playerName)

    lobbyIsDisplayed();

    roomLinkIsValid()
    playerDisplayIsCorrect(['Agust D', playerName])
    deckDisplayIsCorrect()
  });
});