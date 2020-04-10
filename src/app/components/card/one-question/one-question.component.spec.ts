import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneQuestionComponent } from './one-question.component';

describe('OneQuestionComponent', () => {
  let component: OneQuestionComponent;
  let fixture: ComponentFixture<OneQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
