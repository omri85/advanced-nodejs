module.exports = (db, dataTypes) => db.define('publication', {
    // attributes
    name: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    name: {
        type: dataTypes.STRING(100),
        allowNull: false
      }
  }, {
    // options
});