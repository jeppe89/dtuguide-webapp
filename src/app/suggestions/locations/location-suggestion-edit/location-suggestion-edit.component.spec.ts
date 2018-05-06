import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSuggestionEditComponent } from './location-suggestion-edit.component';

describe('LocationSuggestionEditComponent', () => {
  let component: LocationSuggestionEditComponent;
  let fixture: ComponentFixture<LocationSuggestionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSuggestionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSuggestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
