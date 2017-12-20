export class User {
    private userIdentifier: number;
    private firstName: string;
    private lastName: string;
    private email: String;
    private favoriteDrill: number;

    constructor(userId: number, firstName: string, lastName: string, email: string, favoriteDrill: number) {
        this.userIdentifier = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.favoriteDrill = favoriteDrill;
    }
}