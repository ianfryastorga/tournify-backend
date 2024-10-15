'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Partidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ID_Partido: {
        type: Sequelize.INTEGER
      },
      Fecha: {
        type: Sequelize.DATE
      },
      Hora: {
        type: Sequelize.TIME
      },
      ID_Equipo1: {
        type: Sequelize.INTEGER
      },
      ID_Equipo2: {
        type: Sequelize.INTEGER
      },
      Resultado: {
        type: Sequelize.STRING
      },
      ID_Torneo: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Partidos');
  }
};