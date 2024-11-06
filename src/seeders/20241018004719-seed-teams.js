module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Teams', [
    {
      name: 'MacroHard OnFire',
      captainId: 1, 
      tournamentId: 3,
      points: 9,
      matchesPlayed: 3,
      matchesWon: 3,
      matchesDrawn: 0,
      matchesLost: 0,
      goalsFor: 8,
      goalsAgainst: 2,
      goalDifference: 6,
      tournamentSlug: 'liga-cai-uc',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Creyentes de Dios',
      captainId: 2, 
      tournamentId: 3,
      points: 6,
      matchesPlayed: 3,
      matchesWon: 2,
      matchesDrawn: 0,
      matchesLost: 1,
      goalsFor: 5,
      goalsAgainst: 3,
      goalDifference: 2,
      tournamentSlug: 'liga-cai-uc',
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
