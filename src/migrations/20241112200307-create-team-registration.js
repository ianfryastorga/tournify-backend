'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TeamRegistrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: { model: 'Teams', key: 'id' }
      },
      tournamentSlug: {
        type: Sequelize.STRING,
        references: { model: 'Tournaments', key: 'slug' }
      },
      status: {
        type: Sequelize.ENUM('Pendiente', 'Aceptado', 'Rechazado'),
        allowNull: false,
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
    await queryInterface.dropTable('TeamRegistrations');
  }
};