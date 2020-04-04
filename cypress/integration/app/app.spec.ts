import {AppPage} from '../../support/app.po';

describe('App Component', () => {
  it('should display welcome message', () => {
    AppPage.goToPage();
    AppPage.checkTitleText();
  })
})