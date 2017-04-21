'use strict';
module.exports = function(sequelize, DataTypes) {
  var game = sequelize.define('game', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return game;
};