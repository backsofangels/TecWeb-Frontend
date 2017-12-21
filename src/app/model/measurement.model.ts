import { Pollutant } from './pollutant.model';

export class Measurement {
    public pollutantMonitored: Pollutant;
    public quantityMeasured: number;
    public measurementDate: Date;

    constructor (pollutant?: Pollutant, measurement?: number, date?: Date) {
        this.measurementDate = date || new Date();
        this.pollutantMonitored = pollutant || new Pollutant();
        this.quantityMeasured = measurement || 0;
    }
}
