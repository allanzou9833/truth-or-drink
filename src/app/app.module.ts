import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OneQuestionComponent } from './components/card/one-question/one-question.component';
import { TwoQuestionsComponent } from './components/card/two-questions/two-questions.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    OneQuestionComponent,
    TwoQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
