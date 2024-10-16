'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Equipo, {
        foreignKey: 'ID_Equipo',
      })
    }
  }
  Jugador.init({
    Nombre: DataTypes.STRING,
    ID_Equipo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jugador',
  });
  return Jugador;
};