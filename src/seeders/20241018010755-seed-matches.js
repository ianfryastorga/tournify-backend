module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("Matches", [
      {
        date: "2024-06-16",
        time: "16:00:00",
        team1: 3,
        team2: 4,
        result: "2-1",
        tournamentId: 1,
        status: "Finalizado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2024-06-18",
        time: "18:00:00",
        team1: 3,
        team2: 4,
        result: "1-1",
        tournamentId: 1,
        status: "Finalizado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface) => queryInterface.bulkDelete("Matches", null, {}),
};
