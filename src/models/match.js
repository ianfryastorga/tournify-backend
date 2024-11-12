// Match.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      this.belongsTo(models.Team, {
        foreignKey: "team1",
      });
      this.belongsTo(models.Team, {
        foreignKey: "team2",
      });
      this.belongsTo(models.Tournament, {
        foreignKey: "tournamentId", // Usar `tournamentId` para la relación con `Tournament`
        as: "Tournament",
      });
    }
  }

  Match.init(
    {
      date: DataTypes.DATEONLY,
      time: DataTypes.TIME,
      team1: DataTypes.INTEGER,
      team2: DataTypes.INTEGER,
      result: DataTypes.STRING,
      tournamentId: DataTypes.INTEGER, 
      tournamentSlug: DataTypes.STRING, 
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pendiente",
      },
      events: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Match",
    }
  );

  return Match;
};
