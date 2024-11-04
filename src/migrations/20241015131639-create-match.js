'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.TIME
      },
      team1Id: {
        type: Sequelize.INTEGER,
        references: { model: 'Teams', key: 'id' }
      },
      team2Id: {
        type: Sequelize.INTEGER,
        references: { model: 'Teams', key: 'id' }
      },
      result: {
        type: Sequelize.STRING
      },
      tournamentId: {
        type: Sequelize.INTEGER,
        references: { model: 'Tournaments', key: 'id' }
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
    await queryInterface.dropTable('Matches');
  }
};
