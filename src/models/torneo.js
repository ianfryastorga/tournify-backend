'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Torneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: 'ID_Organizador', // Es id de un usuario!
      });
      this.hasMany(models.Equipo, {
        foreignKey: 'id',
      })
      this.hasMany(models.Partido, {
        foreignKey: 'id',
      })
    }
  }
  Torneo.init({
    Nombre: DataTypes.STRING,
    Fecha: DataTypes.DATE,
    Ubicación: DataTypes.STRING,
    Estado: DataTypes.STRING,
    Clasificación: DataTypes.STRING,
    ID_Organizador: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Torneo',
  });
  return Torneo;
};