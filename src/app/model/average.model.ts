import { Drill } from './drill.model';
import { Pollutant } from './pollutant.model';

export class Average {
    drillMonitoring: Drill;
    averageForPollutant: Map<Pollutant, number>;
    beginDate: Date;
    endDate: Date;
}