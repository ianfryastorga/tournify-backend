module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Matches', [
    {
      date: '2023-10-01',
      time: '12:00:00',
      team1Id: 1,
      team2Id: 2,
      result: '1-0',
      tournamentId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Matches', null, {}),
}
