import { DTULocation } from './../../shared/location.interface';
export interface LocationSuggestion {
    id: number;
    author: string;
    date: DateTimeFormat;
    location: DTULocation;
}
