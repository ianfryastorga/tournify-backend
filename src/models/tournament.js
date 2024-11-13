// Tournament.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "organizer",
        as: "Organizer",
      });
      this.hasMany(models.Team, {
        foreignKey: "tournamentId",
        as: "Teams",
      });
      this.hasMany(models.Match, {
        foreignKey: "tournamentId", // Cambia a `tournamentId` en lugar de `tournamentSlug`
        as: "Matches",
      });
    }
  }

  Tournament.init(
    {
      name: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      location: DataTypes.STRING,
      state: DataTypes.STRING,
      rol: DataTypes.STRING,
      classification: DataTypes.STRING,
      description: DataTypes.STRING,
      slug: DataTypes.STRING, 
      image: DataTypes.STRING,
      organizer: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tournament",
    }
  );

  return Tournament;
};
