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
        foreignKey: "teamId", // Clave foránea correcta en Player
        as: "Players",
      });
      this.belongsTo(models.User, {
        foreignKey: 'captainId', 
      });
      this.hasMany(models.Match, {
        foreignKey: "team1", // Usar `team1` o `team2` según la relación que representa
        as: "MatchesAsTeam1",
      });
    }
  }
  Team.init({
    name: DataTypes.STRING,
    captainId: DataTypes.INTEGER, // ID of a user!
    tournamentId: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    matchesPlayed: DataTypes.INTEGER,
    matchesWon: DataTypes.INTEGER,
    matchesDrawn: DataTypes.INTEGER,
    matchesLost: DataTypes.INTEGER,
    goalsFor: DataTypes.INTEGER,
    goalsAgainst: DataTypes.INTEGER,
    goalDifference: DataTypes.INTEGER,
    tournamentSlug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });

  return Team;
};
