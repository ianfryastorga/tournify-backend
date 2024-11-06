module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      name: 'Capitán',
      teamId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Jugador',
      teamId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
}
