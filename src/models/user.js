// User.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Tournament, {
        foreignKey: "organizer",
        as: "OrganizedTournaments",
      });
      this.hasMany(models.Team, {
        foreignKey: "representativeId",
        as: "RepresentedTeams",
      });
      this.hasMany(models.Notification, {
        foreignKey: "userId",
        as: "Notifications",
      });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
