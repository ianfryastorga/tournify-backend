'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      captainId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      tournamentId: {
        type: Sequelize.INTEGER,
        references: { model: 'Tournaments', key: 'id' }
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      matchesPlayed: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      matchesWon: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      matchesDrawn: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      matchesLost: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      goalsFor: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      goalsAgainst: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      goalDifference: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      tournamentSlug: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teams');
  }
};
