import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSuggestionDetailCardComponent } from './person-suggestion-detail-card.component';

describe('PersonSuggestionDetailCardComponent', () => {
  let component: PersonSuggestionDetailCardComponent;
  let fixture: ComponentFixture<PersonSuggestionDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonSuggestionDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSuggestionDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
