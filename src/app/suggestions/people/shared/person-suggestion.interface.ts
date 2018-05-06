import { Person } from './../../../people/shared/person.interface';
export interface PersonSuggestion {
    author: string;
    date: DateTimeFormat;
    suggestionID: number;
    name: string;
    mail: string;
    description: string;
    picture: string;
    role: string;
    room: string;
}
