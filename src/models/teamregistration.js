'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamRegistration extends Model {
    static associate(models) {
      this.belongsTo(models.Team, {
        foreignKey: "teamId",
      });
    }
  }
  TeamRegistration.init({
    teamId: DataTypes.INTEGER,
    tournamentSlug: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('Pendiente', 'Aceptado', 'Rechazado'), 
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TeamRegistration',
  });
  return TeamRegistration;
};