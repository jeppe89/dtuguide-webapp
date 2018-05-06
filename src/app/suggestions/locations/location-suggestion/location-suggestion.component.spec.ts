import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSuggestionComponent } from './location-suggestion.component';

describe('LocationSuggestionComponent', () => {
  let component: LocationSuggestionComponent;
  let fixture: ComponentFixture<LocationSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
