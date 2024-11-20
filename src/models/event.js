// Event.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      this.belongsTo(models.Match, {
        foreignKey: "matchId",
        as: "Match",
      });
      this.belongsTo(models.Player, {
        foreignKey: "playerId",
        as: "Player",
      });
      this.belongsTo(models.Team, {
        foreignKey: "teamId",
        as: "Team",
      });
    }
  }

  Event.init(
    {
      type: {
        type: DataTypes.STRING, // Ejemplo: "Gol", "Asistencia", "Tarjeta Amarilla"
        allowNull: false,
      },
      minute: {
        type: DataTypes.INTEGER, // Minuto en que ocurrió el evento
        allowNull: false,
      },
      matchId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Matches",
          key: "id",
        },
        allowNull: false,
      },
      playerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Players",
          key: "id",
        },
        allowNull: true, // En caso de que el evento no esté asociado a un jugador específico
      },
      teamId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Teams",
          key: "id",
        },
        allowNull: true, // Para eventos generales del equipo, como "Gol en propia puerta"
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );

  return Event;
};
