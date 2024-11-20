const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword = bcrypt.hashSync("Hola123%", saltRounds);

    await queryInterface.bulkInsert("Users", [
      {
        name: "Tomás González",
        email: "tomas@uc.cl",
        password: hashedPassword,
        gender: "Masculino",
        role: "Capitan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "María Pérez",
        email: "maria@uc.cl",
        password: hashedPassword,
        gender: "Mujer",
        role: "Jugador",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Paul Mac Guire",
        email: "paul@uc.cl",
        password: hashedPassword,
        gender: "Hombre",
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Joaquin Paiva",
        email: "joaquin@uc.cl",
        password: hashedPassword,
        gender: "Hombre",
        role: "Jugador",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cristian Soto",
        email: "cristian@uc.cl",
        password: hashedPassword,
        gender: "Hombre",
        role: "Jugador",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
