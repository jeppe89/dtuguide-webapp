export class DTULocation {
    constructor(
        public id: number,
        public description: string,
        public floor: string,
        public landmark: string,
        public name: string,
        public latitude: number,
        public longitude: number) {}

    asLocation() {
        return {
            description: this.description,
            floor: this.floor,
            landmark: this.landmark,
            name: this.name,
            latitude: this.latitude,
            longitude: this.longitude
        };
    }
}
