'use strict';

const Sequelize = require('sequelize')
const SequelizeMock = require('sequelize-mock');
const UserModel = require('../../models/user')
const chai = require('chai')

const DBConnectionMock = new SequelizeMock();
const { createUser, getUserById } = require('../../dbs/postgres').handlers;

const expect = chai.expect

const fakeModels = {
    User: UserModel(DBConnectionMock, Sequelize)
}

describe("User", function() {
    describe("create", function() {
        it("expect create a user with id=1", async function() {
            // 'this' should be the mock and not the real DB
            const userId = await createUser.call(fakeModels, "mockemail@email.com", "mockUser", "123")
            expect(userId).to.equal(1);
        })
        it("expect get user with id 1", async function() {
            const user = await getUserById.call(fakeModels, 1)
            expect(user.id).to.equal(1)
        })
    })
})