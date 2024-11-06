'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
     
      this.belongsTo(models.Team, {
        foreignKey: 'team1',
      });
      this.belongsTo(models.Team, {
        foreignKey: 'team2',
      });
    }
  }

  Match.init({
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    team1: DataTypes.INTEGER,
    team2: DataTypes.INTEGER,
    result: DataTypes.STRING,
    tournamentSlug: DataTypes.STRING, // Usar STRING para el slug en lugar de un ID numérico.
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pendiente', // Asigna un estado predeterminado si es necesario.
    },
    events: {
      type: DataTypes.JSON, // JSON para almacenar eventos del partido.
      defaultValue: [], // Lista vacía por defecto.
    },
  }, {
    sequelize,
    modelName: 'Match',
  });

  return Match;
};
