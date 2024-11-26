"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "organizer",
        as: "Organizer",
      });
      this.hasMany(models.Team, {
        foreignKey: "tournamentId",
        as: "Teams",
      });
      this.hasMany(models.Match, {
        foreignKey: "tournamentId",
        as: "Matches",
      });
    }
  }

  Tournament.init(
    {
      name: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      location: DataTypes.STRING,
      state: DataTypes.STRING,
      rol: DataTypes.STRING,
      classification: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      organizer: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "Tournament",
    }
  );

  return Tournament;
};
