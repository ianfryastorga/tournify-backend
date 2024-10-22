'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Torneo, {
        foreignKey: 'id',
      })
      this.hasMany(models.Notificación, {
        foreignKey: 'id',
      })
      this.hasMany(models.Equipo, {
        foreignKey: 'id',
      })
    }
  }
  Usuario.init({
    Nombre: DataTypes.STRING,
    Correo: DataTypes.STRING,
    Contraseña: DataTypes.STRING,
    Género: DataTypes.STRING,
    Rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};