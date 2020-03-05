const ForbiddenTermError = require('../errors/ForbiddenTermError')
const BAD_WORDS = require('../resources/bad-words')
const PROPS_TO_VALIDATE = ["name", "content"]

function badWordExists(phrase) {
    for (let i=0; i < BAD_WORDS.length; i++) {
        const word = BAD_WORDS[i];
        if (phrase.includes(word)) {
            return true;
        }
    }
    return false;
}

module.exports = (req, res, next) => {
    PROPS_TO_VALIDATE.forEach(property => {
        const phrase= req.body[property];
        if (phrase && badWordExists(phrase)) {
            throw new ForbiddenTermError(property);
        }
    });
    next()
}