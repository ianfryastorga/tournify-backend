"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Matches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      time: {
        type: Sequelize.TIME,
      },
      team1: {
        type: Sequelize.INTEGER,
        references: { model: "Teams", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      team2: {
        type: Sequelize.INTEGER,
        references: { model: "Teams", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      result: {
        type: Sequelize.STRING,
      },
      tournamentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tournaments",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pendiente",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Matches");
  },
};
