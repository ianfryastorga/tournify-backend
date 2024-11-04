'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      this.belongsTo(models.Tournament, {
        foreignKey: 'tournamentId',
      });
      this.belongsTo(models.Team, {
        foreignKey: 'team1Id',
      });
      this.belongsTo(models.Team, {
        foreignKey: 'team2Id',
      });
    }
  }
  Match.init({
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    team1Id: DataTypes.INTEGER,
    team2Id: DataTypes.INTEGER,
    result: DataTypes.STRING,
    tournamentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};
