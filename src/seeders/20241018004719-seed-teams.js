module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("Teams", [
      {
        name: "Ingeniería",
        captainId: 1,
        tournamentId: 3,
        points: 0,
        matchesPlayed: 0,
        matchesWon: 0,
        matchesDrawn: 0,
        matchesLost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Medicina",
        captainId: 3,
        tournamentId: 3,
        points: 0,
        matchesPlayed: 0,
        matchesWon: 0,
        matchesDrawn: 0,
        matchesLost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Derecho",
        captainId: 2,
        tournamentId: 1,
        points: 4,
        matchesPlayed: 2,
        matchesWon: 1,
        matchesDrawn: 1,
        matchesLost: 0,
        goalsFor: 3,
        goalsAgainst: 2,
        goalDifference: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Arquitectura",
        captainId: 4,
        tournamentId: 1,
        points: 1,
        matchesPlayed: 2,
        matchesWon: 0,
        matchesDrawn: 1,
        matchesLost: 1,
        goalsFor: 2,
        goalsAgainst: 3,
        goalDifference: -1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Colo-Colo",
        captainId: 6,
        tournamentId: 3,
        points: 1,
        matchesPlayed: 2,
        matchesWon: 1,
        matchesDrawn: 1,
        matchesLost: 0,
        goalsFor: 5,
        goalsAgainst: 3,
        goalDifference: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Universidad de Chile",
        captainId: 7,
        tournamentId: 3,
        points: 1,
        matchesPlayed: 2,
        matchesWon: 0,
        matchesDrawn: 1,
        matchesLost: 1,
        goalsFor: 2,
        goalsAgainst: 3,
        goalDifference: -1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface) => queryInterface.bulkDelete("Teams", null, {}),
};
