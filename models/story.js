module.exports = (db, dataTypes) => db.define('story', {
    // attributes
    name: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    hashtags: {
      type: dataTypes.STRING(100)
    }
  }, {
    // options
});