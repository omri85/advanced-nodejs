class ForbiddenTermError extends Error {
    constructor(term_name) {
        super(`A forbidden term was found in term: '${term_name}'`);
        this.name = this.constructor.name;
    }
}

module.exports = ForbiddenTermError