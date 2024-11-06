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
    {
      name: 'Los Ateos',
      representativeId: 3, 
      tournamentId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Los Dormilones',
      representativeId: 4, 
      tournamentId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Teams', null, {}),
}
