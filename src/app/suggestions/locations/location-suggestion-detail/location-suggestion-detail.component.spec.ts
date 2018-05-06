import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSuggestionDetailComponent } from './location-suggestion-detail.component';

describe('LocationSuggestionDetailComponent', () => {
  let component: LocationSuggestionDetailComponent;
  let fixture: ComponentFixture<LocationSuggestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSuggestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSuggestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
