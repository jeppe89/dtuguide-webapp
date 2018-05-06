import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSuggestionListComponent } from './person-suggestion-list.component';

describe('PersonSuggestionListComponent', () => {
  let component: PersonSuggestionListComponent;
  let fixture: ComponentFixture<PersonSuggestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonSuggestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSuggestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
