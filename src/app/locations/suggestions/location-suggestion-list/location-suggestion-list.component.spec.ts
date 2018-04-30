import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSuggestionListComponent } from './location-suggestion-list.component';

describe('LocationSuggestionListComponent', () => {
  let component: LocationSuggestionListComponent;
  let fixture: ComponentFixture<LocationSuggestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSuggestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSuggestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
