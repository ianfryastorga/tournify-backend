"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Teams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      captainId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
      },
      representativeId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
      },
      tournamentId: {
        type: Sequelize.INTEGER,
        references: { model: "Tournaments", key: "id" },
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      matchesPlayed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      matchesWon: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      matchesDrawn: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      matchesLost: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      goalsFor: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      goalsAgainst: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      goalDifference: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      tournamentSlug: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "Tournaments", key: "slug" },
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
    await queryInterface.dropTable("Teams");
  },
};
