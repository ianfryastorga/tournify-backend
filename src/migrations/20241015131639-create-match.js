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
        type: Sequelize.DATEONLY // Usamos DATEONLY para solo almacenar la fecha.
      },
      time: {
        type: Sequelize.TIME
      },
      team1: {
        type: Sequelize.INTEGER,
        references: { model: 'Teams', key: 'id' }
      },
      team2: {
        type: Sequelize.INTEGER,
        references: { model: 'Teams', key: 'id' }
      },
      result: {
        type: Sequelize.STRING
      },
      tournamentSlug: {
        type: Sequelize.STRING // Usamos STRING para el slug en lugar de un ID numérico.
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pendiente' // Valor predeterminado en caso de que el estado no esté definido.
      },
      events: {
        type: Sequelize.JSON, // Campo JSON para almacenar los eventos del partido.
        defaultValue: [] // Asignamos una lista vacía como valor predeterminado.
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
