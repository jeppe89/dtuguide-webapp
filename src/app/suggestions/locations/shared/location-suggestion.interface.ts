import { DTULocation } from '../../../locations/shared/location.interface';

export interface LocationSuggestion {
    suggestionID: number;
    author: string;
    date: DateTimeFormat;
    description: string;
    floor: number;
    landmark: string;
    latitude: number;
    longitude: number;
    name: string;
    tags: string[];
}
