'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'organizer', // ID del organizador (User).
      });
      this.hasMany(models.Team, {
        foreignKey: 'id', // Corrección: ID de torneo en Team.
      });
      this.hasMany(models.Match, {
        foreignKey: 'id', // Corrección: ID de torneo en Match.
      });
    }
  }

  Tournament.init({
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY, // Usamos DATEONLY para solo almacenar la fecha.
    location: DataTypes.STRING,
    state: DataTypes.STRING, // Cambiado de `status` a `state`.
    rol: DataTypes.STRING, // Nuevo campo para `rol`.
    classification: DataTypes.STRING,
    description: DataTypes.STRING, // Nuevo campo para `description`.
    slug: DataTypes.STRING, // Nuevo campo para `slug`.
    image: DataTypes.STRING,
    organizer: DataTypes.STRING, // Nuevo campo para `organizer` como string en lugar de ID.
  }, {
    sequelize,
    modelName: 'Tournament',
  });

  return Tournament;
};
