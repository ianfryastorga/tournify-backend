'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      this.belongsTo(models.Tournament, {
        foreignKey: 'tournamentId', 
      });
      this.hasMany(models.Player, {
        foreignKey: 'id',
      });
      this.belongsTo(models.User, {
        foreignKey: 'captainId', 
      });
      this.hasMany(models.Match, {
        foreignKey: 'id',
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
