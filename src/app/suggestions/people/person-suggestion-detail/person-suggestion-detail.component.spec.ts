import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSuggestionDetailComponent } from './person-suggestion-detail.component';

describe('PersonSuggestionDetailComponent', () => {
  let component: PersonSuggestionDetailComponent;
  let fixture: ComponentFixture<PersonSuggestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonSuggestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSuggestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
