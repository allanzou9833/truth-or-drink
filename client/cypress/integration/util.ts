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

export const dataSelector = (value: string) => `[data-cy=${value}]`;

export const verifyElementsExist = (selectors: string[]) => {
  selectors.forEach(selector => {
    cy.get(dataSelector(selector)).should('exist');
  })
}

export const verifyElementsDontExist = (selectors: string[]) => {
  selectors.forEach(selector => {
    cy.get(dataSelector(selector)).should('not.exist');
  })
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
      const texts = [...$lis].map(li => li.textContent.trim());
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
      const texts = [...$buttons].map(b => b.textContent.trim());
      expect(texts).to.deep.eq(expected.map(x => x.text));

      const classes = [...$buttons].map(b => b.className);
      expect(classes).to.deep.eq(expected.map(x => x.classes));
    });
}

export const createRoom = (playerName: string) => {
  cy.get(dataSelector(selectors.INPUT_NAME)).focus().type(playerName);
  cy.get(dataSelector(selectors.BTN_CREATE)).click();
}

export const clickDeckSelect = (deckIndex: number) => {
  cy.get(dataSelector(`deck_${deckIndex}`))
    .click()
    .as(`deck_${deckIndex}`);
}

export const clickStartGameBtn = () => {
  cy.get(dataSelector('btn_start')).click();
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

