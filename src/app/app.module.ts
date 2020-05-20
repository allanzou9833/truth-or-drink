import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { OneQuestionComponent } from './components/card/one-question/one-question.component';
import { TwoQuestionsComponent } from './components/card/two-questions/two-questions.component';
import { HomeComponent } from './components/home/home.component';
import { LobbyComponent } from './components/lobby/lobby.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    OneQuestionComponent,
    TwoQuestionsComponent,
    HomeComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
