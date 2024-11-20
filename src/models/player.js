"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      this.belongsTo(models.Team, {
        foreignKey: "teamId",
      });
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Player.init(
    {
      teamId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      goals: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Player",
    }
  );
  return Player;
};
