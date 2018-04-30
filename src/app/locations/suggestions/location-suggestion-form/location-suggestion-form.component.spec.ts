import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSuggestionFormComponent } from './location-suggestion-form.component';

describe('LocationSuggestionFormComponent', () => {
  let component: LocationSuggestionFormComponent;
  let fixture: ComponentFixture<LocationSuggestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSuggestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSuggestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
