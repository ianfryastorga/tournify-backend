'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Partido.init({
    ID_Partido: DataTypes.INTEGER,
    Fecha: DataTypes.DATE,
    Hora: DataTypes.TIME,
    ID_Equipo1: DataTypes.INTEGER,
    ID_Equipo2: DataTypes.INTEGER,
    Resultado: DataTypes.STRING,
    ID_Torneo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Partido',
  });
  return Partido;
};