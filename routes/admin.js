
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroSequelize = require('admin-bro-sequelizejs')

const {User, Story, Publication} = require('../dbs/postgres').models

AdminBro.registerAdapter(AdminBroSequelize)
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [User, Publication, Story],
})

module.exports = AdminBroExpress.buildRouter(adminBro)