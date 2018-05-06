import { TestBed, inject } from '@angular/core/testing';

import { LocationSuggestionService } from './location-suggestion.service';

describe('LocationSuggestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationSuggestionService]
    });
  });

  it('should be created', inject([LocationSuggestionService], (service: LocationSuggestionService) => {
    expect(service).toBeTruthy();
  }));
});
