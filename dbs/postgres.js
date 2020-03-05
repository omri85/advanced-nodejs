const Sequelize = require('sequelize');
const UserModel = require('../models/user')
const PublicationModel = require('../models/publication')
const StoryModel = require('../models/story')

const sequelize = new Sequelize('storyteller', 'storyteller', '123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// models
this.User = User = UserModel(sequelize, Sequelize)
this.Publication = Publication = PublicationModel(sequelize, Sequelize)
this.Story = Story = StoryModel(sequelize, Sequelize)

// User.sync({force: true})
User.hasMany(Publication)
User.hasMany(Story)
Publication.belongsToMany(Story, {through: 'PublicationStory'})
Story.belongsToMany(Publication, {through: 'PublicationStory'})

if (process.env.NODE_ENV != 'production') {
  console.log("Syncing DB - Development only!")
  sequelize.sync();
}

const handlers = {
  getStoryById: async (id) => {
    res = await this.Story.findOne({
        where: {id}
    })
    return res
  },
  createStory: async (name) => {
    const res = await this.Story.create({name});
    return res.id
  },
  createUser: async function(email, name, password) {
    const user = await this.User.create({email, name, password})
    return user.id;
  },
  getUserById: async function(id) {
    const user = await this.User.findOne({ where: {id} })
    return user;
  },
  deleteUserStories: async function(userId) {
    await this.Story.destroy({where: { userId }})
  }
}
  

module.exports = {
  db: sequelize,
  models : {User, Publication, Story},
  handlers
}