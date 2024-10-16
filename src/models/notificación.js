'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificación extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: 'ID_Usuario',
      });
      
    }
  }
  Notificación.init({
    Mensaje: DataTypes.STRING,
    Fecha: DataTypes.STRING,
    ID_Usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notificación',
  });
  return Notificación;
};