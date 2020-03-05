const ForbiddenTermError = require('../errors/ForbiddenTermError')

function errorHandler (err, req, res, next) {
    if (err instanceof ForbiddenTermError) {
        res.status(400)
        res.send(err.message)
        return
    }
    res.status(500)
    console.log(err)
    res.render('error', { error: err })
}

module.exports = errorHandler