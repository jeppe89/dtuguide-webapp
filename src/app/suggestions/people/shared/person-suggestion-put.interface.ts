import { PersonSuggestion } from './person-suggestion.interface';
import { Person } from '../../../people/shared/person.interface';
export interface PersonSuggestionPut {
    oldPerson: PersonSuggestion;
    newPerson: Person;
}
