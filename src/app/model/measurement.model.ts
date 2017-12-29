import {Pollutant} from './pollutant.model';

export class Measurement {
    public pollutantMonitored: Pollutant;
    public quantityMeasured: number;
    public measurementDate: Date;

    constructor(pollutant: Pollutant, measurement: number, date: Date) {
        this.measurementDate = date;
        this.pollutantMonitored = pollutant;
        this.quantityMeasured = measurement;
    }
}
