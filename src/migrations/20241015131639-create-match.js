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
      },
      team2: {
        type: Sequelize.INTEGER,
        references: { model: "Teams", key: "id" },
      },
      result: {
        type: Sequelize.STRING,
      },
      tournamentId: {
        // Cambiado de `tournamentSlug` a `tournamentId`
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
      events: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      tournamentSlug: {
        type: Sequelize.STRING,
        references : {
          model: "Tournaments",
          key: "slug",
        },
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
