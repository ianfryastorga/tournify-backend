const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword = bcrypt.hashSync("Hola123%", saltRounds);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Tomás González',
        email: 'tgonza@uc.cl',
        password: hashedPassword,
        gender: 'Masculino',
        role: 'Capitan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'María Pérez',
        email: 'mperez@uc.cl',
        password: hashedPassword,
        gender: 'Femenino',
        role: 'Jugador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Martini Ramirez',
        email: 'mabe@uc.cl',
        password: hashedPassword,
        gender: 'Femenino',
        role: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Juaquín Paiva',
        email: 'paiva@uc.cl',
        password: hashedPassword,
        gender: 'Masculino',
        role: 'Jugador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
