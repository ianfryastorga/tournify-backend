module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      name: 'Tomás González',
      email: 'tgonza@uc.cl',
      password: '1234',
      gender: 'Masculino',
      role: 'Organizador',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'María Pérez',
      email: 'mperez@uc.cl',
      password: '1234',
      gender: 'Femenino',
      role: 'Jugador',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Martini Ramirez',
      email: 'mabe@uc.cl',
      password: '1234',
      gender: 'Femenino',
      role: 'Administrador',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Juaquín Paiva',
      email: 'paiva@uc.cl',
      password: '1234',
      gender: 'Masculino',
      role: 'Jugador',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
}
