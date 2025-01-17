module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("Events", [
      {
        type: "Gol",
        minute: 10,
        matchId: 1,
        playerId: 2,
        teamId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Gol",
        minute: 20,
        matchId: 1,
        playerId: 3,
        teamId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Gol",
        minute: 45,
        matchId: 1,
        playerId: 2,
        teamId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Gol",
        minute: 14,
        matchId: 2,
        playerId: 2,
        teamId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Gol",
        minute: 30,
        matchId: 2,
        playerId: 3,
        teamId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   type: "Gol",
      //   minute: 30,
      //   matchId: 2,
      //   playerId: 4,
      //   teamId: 3,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   type: "Gol",
      //   minute: 60,
      //   matchId: 2,
      //   playerId: 5,
      //   teamId: 4,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    ]),

  down: (queryInterface) => queryInterface.bulkDelete("Events", null, {}),
};
