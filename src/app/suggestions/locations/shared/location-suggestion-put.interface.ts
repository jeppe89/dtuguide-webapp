import { DTULocation } from './../../../locations/shared/location.interface';
import { LocationSuggestion } from './location-suggestion.interface';
export interface LocationSuggestionPut {
    oldLocation: LocationSuggestion;
    newLocation: DTULocation;
}
