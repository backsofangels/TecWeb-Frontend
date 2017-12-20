import { Drill } from '../model/drill.model';
import { Measurement } from '../model/measurement.model';
import { Pollutant } from '../model/pollutant.model';
import { Average } from '../model/average.model';
import { DrillMocks } from '../mocks/drills.mocks';
import { AverageMocks } from '../mocks/average.mocks';
import { PollutantMocks } from '../mocks/pollutants.mocks';
import { MeasurementMock } from '../mocks/measurement.mocks';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class MockServerService {

    private drillMocks = new DrillMocks;
    private pollutantMocks = new PollutantMocks();
    private measurementMocks = new MeasurementMock();
    private averageMocks = new AverageMocks();

    getDrill(): HttpResponse<any> {
        let headers = new HttpHeaders({
            ['Content-type']: 'application/json'
        });
        return new HttpResponse({
            body: this.drillMocks.firstDrill,
            headers: headers,
            status: 200
        });
    }

    getMeasurementByDrill(): HttpResponse<any> {
        let headers = new HttpHeaders({
            ['Content-type']: 'application/json'
        });
        return new HttpResponse({
            body: this.measurementMocks.firstMeasurement,
            headers: headers,
            status: 200
        });
    }
}