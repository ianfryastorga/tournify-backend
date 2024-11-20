// Match.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      this.belongsTo(models.Team, {
        foreignKey: "team1",
        as: "Team1", // Alias explícito para el equipo 1
      });
      this.belongsTo(models.Team, {
        foreignKey: "team2",
        as: "Team2", // Alias explícito para el equipo 2
      });
      this.belongsTo(models.Tournament, {
        foreignKey: "tournamentId",
        as: "Tournament",
      });
      this.hasMany(models.Event, {
        foreignKey: "matchId",
        as: "Events",
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pendiente",
      },
    },
    {
      sequelize,
      modelName: "Match",
    }
  );

  return Match;
};
