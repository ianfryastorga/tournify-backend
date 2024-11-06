module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Teams', [
    {
      name: 'Ingeniería',
      captainId: 2,  // Ajustado para coincidir con el ID en la tabla de usuarios
      tournamentId: 3,  // Ajusta según el ID del torneo 'liga-cai-uc'
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
      name: 'Medicina',
      captainId: 5,  // Ajustado para coincidir con el ID en la tabla de usuarios
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
      name: 'Derecho',
      captainId: 8,
      tournamentId: 3,
      points: 4,
      matchesPlayed: 3,
      matchesWon: 1,
      matchesDrawn: 1,
      matchesLost: 1,
      goalsFor: 3,
      goalsAgainst: 4,
      goalDifference: -1,
      tournamentSlug: 'liga-cai-uc',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Arquitectura',
      captainId: 11,
      tournamentId: 3,
      points: 1,
      matchesPlayed: 3,
      matchesWon: 0,
      matchesDrawn: 1,
      matchesLost: 2,
      goalsFor: 2,
      goalsAgainst: 6,
      goalDifference: -4,
      tournamentSlug: 'liga-cai-uc',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Teams', null, {}),
};
