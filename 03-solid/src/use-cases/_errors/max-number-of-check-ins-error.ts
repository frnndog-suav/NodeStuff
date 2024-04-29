export class MaxNumberOfCheckInsError extends Error {
    constructor() {
        super('Number of check-ins reached.')
    }
}
