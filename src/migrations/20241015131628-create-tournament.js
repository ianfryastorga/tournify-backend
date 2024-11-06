"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tournaments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATEONLY, // Usamos DATEONLY para solo almacenar la fecha.
      },
      location: {
        type: Sequelize.STRING,
      },
      state: {
        // Cambiado de `status` a `state`.
        type: Sequelize.STRING,
      },
      rol: {
        // Nuevo campo `rol`.
        type: Sequelize.STRING,
      },
      classification: {
        type: Sequelize.STRING,
      },
      description: {
        // Nuevo campo `description`.
        type: Sequelize.STRING,
      },
      slug: {
        // Nuevo campo `slug`.
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      organizer: {
        // Cambiado a INTEGER para referenciar a Users.id
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // Hace referencia a la tabla Users
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
    await queryInterface.dropTable("Tournaments");
  },
};
