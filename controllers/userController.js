const {UniqueConstraintError} = require('sequelize')

const { createUser, getUserById } = require('../dbs/postgres').handlers;
const publish = require('../rabbitmq/publish')
const { setUserDeletionPending, getUserDeletionStatus } = require('../dbs/redis')

module.exports = {
    addUser: async (req, res) => {
        const {name, email, password} = req.body;
        if (!(name && email && password)) {
            res.status(400);
            res.send("Missing body params 'name' or 'email' or 'password");
            return
        }
        try {
            const id = await createUser(email, name, password);
            res.send(id && id.toString());
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                res.status(404)
                res.send("User already exists")
            }
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params
        const deletionStatus = await getUserDeletionStatus(id)
        if (deletionStatus) {
            res.send(deletionStatus)
            return
        }
        const user = await getUserById(id)
        if (!user) {
            res.sendStatus(404)
        } else {
            res.send(user)
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params
        await publish(id)
        await setUserDeletionPending(id)
        res.sendStatus(204)
    }
}
