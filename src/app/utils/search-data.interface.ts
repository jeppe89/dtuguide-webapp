import { LocationSuggestion } from '../suggestions/locations/shared/location-suggestion.interface';
import { DTULocation } from '../locations/shared/location.interface';
import { PersonSuggestion } from '../suggestions/people/shared/person-suggestion.interface';
import { Person } from '../people/shared/person.interface';

export interface SearchData {
    numPages: number;
    totalItems: number;
    pageNumber: number;
    data: DTULocation[] | Person[] | LocationSuggestion[] | PersonSuggestion[];
}
