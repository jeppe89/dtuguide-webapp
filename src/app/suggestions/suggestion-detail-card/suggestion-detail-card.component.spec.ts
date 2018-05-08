import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionDetailCardComponent } from './suggestion-detail-card.component';

describe('SuggestionDetailCardComponent', () => {
  let component: SuggestionDetailCardComponent;
  let fixture: ComponentFixture<SuggestionDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
