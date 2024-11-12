// Team.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      this.belongsTo(models.Tournament, {
        foreignKey: "tournamentId",
        as: "Tournament",
      });
      this.hasMany(models.Player, {
        foreignKey: "teamId",
        as: "Players",
      });
      this.hasOne(models.TeamRegistration, {
        foreignKey: "teamID",
      });
      this.belongsTo(models.User, {
        foreignKey: "representativeId",
        as: "Representative",
      });
      this.hasMany(models.Match, {
        foreignKey: "team1",
        as: "MatchesAsTeam1",
      });
    }
  }

  Team.init(
    {
      name: DataTypes.STRING,
      captainId: DataTypes.INTEGER,
      representativeId: DataTypes.INTEGER,
      tournamentId: DataTypes.INTEGER,
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      matchesPlayed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      matchesWon: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      matchesDrawn: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      matchesLost: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goalsFor: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goalsAgainst: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goalDifference: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      tournamentSlug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Team",
    }
  );

  return Team;
};
