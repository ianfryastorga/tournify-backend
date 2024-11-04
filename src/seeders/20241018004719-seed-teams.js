module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Teams', [
    {
      name: 'MacroHard OnFire',
      representativeId: 1, 
      tournamentId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Creyentes de Dios',
      representativeId: 2, 
      tournamentId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Teams', null, {}),
}
