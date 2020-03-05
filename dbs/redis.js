const redis = require("async-redis");
const client = redis.createClient();
 
client.on("error", function(error) {
  console.error(error);
});

const userDeletionStatus = {
    PENDING: 1,
    DELETED: 2
}

const setUserDeletionPending = async (userId) => {
    const status = {
        status: userDeletionStatus.PENDING,
        time: Date.now()
    }
    await client.set(userId, JSON.stringify(status))
}

const setUserDeletionDone = async userId => {
    const status = {
        status: userDeletionStatus.DELETED,
        time: Date.now()
    }
    await client.set(userId, JSON.stringify(status), 'EX', 30)
}

const getUserDeletionStatus = async (userId) => {
    const cachedStatus = await client.get(userId)
    if (!cachedStatus) {
        return
    }
    const status = JSON.parse(cachedStatus).status
    return status == userDeletionStatus.DELETED ? "Deleted" :"Pending for deletion"
}
module.exports = { setUserDeletionDone, setUserDeletionPending, userDeletionStatus, getUserDeletionStatus }