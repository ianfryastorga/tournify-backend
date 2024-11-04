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
        foreignKey: 'representativeId', 
      });
      this.hasMany(models.Match, {
        foreignKey: 'id',
      });
    }
  }
  Team.init({
    name: DataTypes.STRING,
    representativeId: DataTypes.INTEGER, // ID of a user!
    tournamentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
