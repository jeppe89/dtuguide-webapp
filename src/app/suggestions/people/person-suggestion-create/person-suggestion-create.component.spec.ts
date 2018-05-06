import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSuggestionCreateComponent } from './person-suggestion-create.component';

describe('PersonSuggestionCreateComponent', () => {
  let component: PersonSuggestionCreateComponent;
  let fixture: ComponentFixture<PersonSuggestionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonSuggestionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSuggestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
