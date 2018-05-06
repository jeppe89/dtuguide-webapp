import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSuggestionComponent } from './person-suggestion.component';

describe('PersonSuggestionComponent', () => {
  let component: PersonSuggestionComponent;
  let fixture: ComponentFixture<PersonSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
