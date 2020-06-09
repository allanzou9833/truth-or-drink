export const selectors = {
  'INPUT_NAME': 'input_name',
  'BTN_JOIN': 'btn_join',
  'BTN_CREATE': 'btn_create',
  'ROOM_LINK': 'room_link', 
  'BTN_COPY': 'btn_copy', 
  'DISPLAY_PLAYERS': 'display_players', 
  'DISPLAY_DECKS': 'display_decks', 
  'BTN_START': 'btn_start',
  'CARD': 'card',
  'BTN_NEW_GAME': 'btn_new_game',
  'BTN_NEXT': 'btn_next',
  'MSG_EMPTY': 'msg_empty',
  'BTN_RESTART': 'btn_restart'
}

const dataSelector = (value: string) => `[data-cy=${value}]`;

const verifyElementsExist = (selectors: string[]) => {
  selectors.forEach(selector => {
    cy.get(dataSelector(selector)).should('exist');
  })
}

const verifyElementsDontExist = (selectors: string[]) => {
  selectors.forEach(selector => {
    cy.get(dataSelector(selector)).should('not.exist');
  })
}

export const clickBtn = (selector: string) => {
  cy.get(dataSelector(selector)).click();
}

export const homeIsDisplayed = (join: boolean = false) => {
  if(join) {
    verifyElementsExist([
      selectors.INPUT_NAME, 
      selectors.BTN_JOIN, 
      selectors.BTN_CREATE
    ]);
  }
  else {
    verifyElementsExist([selectors.INPUT_NAME, selectors.BTN_CREATE]);
    verifyElementsDontExist([selectors.BTN_JOIN]);
  }
  //   cy.focused().should('have.id', 'name');
}

export const lobbyIsDisplayed = () => {
  verifyElementsExist([
    selectors.ROOM_LINK, 
    selectors.BTN_COPY, 
    selectors.DISPLAY_PLAYERS, 
    selectors.DISPLAY_DECKS, 
    selectors.BTN_START
  ]);
}

export const cardIsDisplayed = () => {
  verifyElementsExist([
    selectors.CARD,
    selectors.BTN_NEW_GAME,
    selectors.BTN_NEXT
  ]);

  verifyElementsDontExist([
    selectors.MSG_EMPTY,
    selectors.BTN_RESTART
  ]);
}

export const cardEmptyIsDisplayed = () => {
  verifyElementsExist([
    selectors.MSG_EMPTY,
    selectors.BTN_RESTART
  ]);

  verifyElementsDontExist([
    selectors.CARD,
    selectors.BTN_NEW_GAME,
    selectors.BTN_NEXT
  ]);
}

export const roomLinkIsValid = () => {
  cy.get(dataSelector(selectors.ROOM_LINK)).should($input => {
    const val = $input.val();
    const url = Cypress.config().baseUrl.replace(/\//g, '\\/');
    const regex = new RegExp(`${url}\\/\\?[A-Za-z0-9]{7}`);
    expect(val).to.match(regex);
  });
}

export const playerDisplayIsCorrect = (players: string[]) => {
  const selector = `${dataSelector(selectors.DISPLAY_PLAYERS)} > ul`;
  cy.get(selector)
    .children()
    .should('have.length', players.length)
    .then($lis => {
      const texts = [...$lis.toArray()].map(li => li.textContent.trim());
      expect(texts).to.deep.eq(players);
    })
}

export const deckDisplayIsCorrect = () => {
  const expected = [
    {
      text: 'On The Rocks',
      classes: 'btn btn-select enabled'
    },
    {
      text: 'Last Call',
      classes: 'btn btn-select'
    },
    {
      text: 'Happy Hour',
      classes: 'btn btn-select'
    },
    {
      text: 'Extra Dirty',
      classes: 'btn btn-select'
    }
  ]
  cy.get(dataSelector(selectors.DISPLAY_DECKS))
    .children('button')
    .should('have.length', 4)
    .then($buttons => {
      const texts = [...$buttons.toArray()].map(b => b.textContent.trim());
      expect(texts).to.deep.eq(expected.map(x => x.text));

      const classes = [...$buttons.toArray()].map(b => b.className);
      expect(classes).to.deep.eq(expected.map(x => x.classes));
    });
}

export const createRoom = (playerName: string) => {
  cy.get(dataSelector(selectors.INPUT_NAME)).focus().type(playerName);
  clickBtn(selectors.BTN_CREATE);
}

export const joinRoom = (playerName: string) => {
  cy.get(dataSelector(selectors.INPUT_NAME)).focus().type(playerName);
  clickBtn(selectors.BTN_JOIN);
}

export const clickDeckSelect = (deckIndex: number, chainer: string, value: string) => {
  cy.get(dataSelector(`deck_${deckIndex}`))
    .click()
    .should(chainer, value)
}

export const setupSocketioFailure = (visitRoute: string) => {
  cy.server();
  cy.route({
    method: 'GET',
    url: '/socket.io/**',
    onAbort: (xhr) => {
      expect(xhr.aborted).to.be.false;
    }
  }).as('socketio');
  cy.visit(visitRoute);
  cy.wait('@socketio', { requestTimeout: 2000 });
}


