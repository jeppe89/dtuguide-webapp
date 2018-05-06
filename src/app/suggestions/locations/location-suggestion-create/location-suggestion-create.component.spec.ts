import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSuggestionCreateComponent } from './location-suggestion-create.component';

describe('LocationSuggestionCreateComponent', () => {
  let component: LocationSuggestionCreateComponent;
  let fixture: ComponentFixture<LocationSuggestionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSuggestionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSuggestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
