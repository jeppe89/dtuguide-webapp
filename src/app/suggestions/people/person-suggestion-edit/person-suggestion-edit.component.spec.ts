import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSuggestionEditComponent } from './person-suggestion-edit.component';

describe('PersonSuggestionEditComponent', () => {
  let component: PersonSuggestionEditComponent;
  let fixture: ComponentFixture<PersonSuggestionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonSuggestionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSuggestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
