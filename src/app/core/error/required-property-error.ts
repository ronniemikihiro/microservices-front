export class RequiredPropertyError extends Error {
    constructor(property: string) {
        super(property + ' is required!');
        Object.setPrototypeOf(this, RequiredPropertyError.prototype);
    }
}