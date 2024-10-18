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
      this.belongsTo(models.Torneo, {
        foreignKey: 'ID_Torneo', 
      });
      this.hasMany(models.Jugador, {
        foreignKey: 'id',
      });
      this.belongsTo(models.Usuario, {
        foreignKey: 'ID_Representante', 
      });
      this.hasMany(models.Partido, {
        foreignKey: 'id',
      });
    }
  }
  Equipo.init({
    Nombre: DataTypes.STRING,
    ID_Representante: DataTypes.INTEGER, // ID de un usuario!  
    ID_Torneo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Equipo',
  });
  return Equipo;
};