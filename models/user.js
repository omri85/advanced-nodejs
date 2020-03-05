'use strict';

const User = (db, dataTypes) => db.define('user', {
    // attributes
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
        type: dataTypes.STRING,
        allowNull: false
    },
    admin: {
      type: dataTypes.BOOLEAN,
      default: false
    }
  }, {
    // options
});



module.exports = User;