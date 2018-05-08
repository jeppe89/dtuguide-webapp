import { DTULocation } from './../../locations/shared/location.interface';
export interface Person {
    id: number;
    name: string;
    mail: string;
    description: string;
    role: string;
    picture: string;
    location: DTULocation;
}
