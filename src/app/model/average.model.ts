import {Drill} from './drill.model';
import {Pollutant} from './pollutant.model';

export class Average {
    drillInformations: Drill;
    measurements: Map<Pollutant, number>;
    minorBoundary: Date;
    maximumBoundary: Date;
}