export class MeasurementMock {
    firstMeasurement = [
        {
          'measurementDate': 'Jan 1, 2000, 12:00:00 AM',
          'pollutantMonitored': {
            'pollutantID': 1,
            'pollutantName': 'Monossido di carbonio',
            'maximumThreshold': 1.52
          },
          'quantityMeasured': 2.125
        },
        {
          'measurementDate': 'Jan 1, 2000, 1:00:00 AM',
          'pollutantMonitored': {
            'pollutantID': 2,
            'pollutantName': 'Anidride solforosa',
            'maximumThreshold': 1.24
          },
          'quantityMeasured': 0.14
        }
      ];
}
