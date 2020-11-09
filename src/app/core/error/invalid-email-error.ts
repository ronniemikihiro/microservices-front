export class InvalidEmailError extends Error {
    constructor() {
        super('Please enter a valid email address!');
        Object.setPrototypeOf(this, InvalidEmailError.prototype);
    }
}