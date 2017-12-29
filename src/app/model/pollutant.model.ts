export class Pollutant {
    pollutantID: number;
    pollutantName: string;
    maximumThreshold: number;

    constructor(pollutantID: number, pollutantName: string, max: number) {
        this.pollutantID = pollutantID;
        this.maximumThreshold = max;
        this.pollutantName = pollutantName;
    }
}