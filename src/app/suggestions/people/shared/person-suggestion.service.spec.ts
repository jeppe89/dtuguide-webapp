import { TestBed, inject } from '@angular/core/testing';

import { PersonSuggestionService } from './person-suggestion.service';

describe('PersonSuggestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonSuggestionService]
    });
  });

  it('should be created', inject([PersonSuggestionService], (service: PersonSuggestionService) => {
    expect(service).toBeTruthy();
  }));
});
