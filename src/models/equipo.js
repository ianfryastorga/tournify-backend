'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Equipo.init({
    ID_Equipo: DataTypes.INTEGER,
    Nombre: DataTypes.STRING,
    ID_Representante: DataTypes.INTEGER,
    ID_Torneo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Equipo',
  });
  return Equipo;
};