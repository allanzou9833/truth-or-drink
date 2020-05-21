import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoQuestionsComponent } from './two-questions.component';

describe('TwoQuestionsComponent', () => {
  let component: TwoQuestionsComponent;
  let fixture: ComponentFixture<TwoQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
