'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      this.belongsTo(models.Team, {
        foreignKey: 'teamId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Player.init({
    name: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
