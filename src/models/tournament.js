'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'organizerId', // This is the id of a user!
      });
      this.hasMany(models.Team, {
        foreignKey: 'id',
      });
      this.hasMany(models.Match, {
        foreignKey: 'id',
      });
    }
  }
  Tournament.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    status: DataTypes.STRING,
    classification: DataTypes.STRING,
    organizerId: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};
