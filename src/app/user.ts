export class User {
    private identifier: number;
    private firstName: string;
    private lastName: string;
    private favoriteDrill: number;
    private email: string;

    constructor(identifier: number, firstName: string, lastName: string, favoriteDrill: number, email: string) {
        this.identifier = identifier;
        this.firstName = firstName;
        this.lastName = lastName;
        this.favoriteDrill = favoriteDrill;
        this.email = email;
    }
}