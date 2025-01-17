module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("Players", [
      { teamId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { teamId: 3, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { teamId: 4, userId: 4, createdAt: new Date(), updatedAt: new Date() },
      { teamId: 2, userId: 5, createdAt: new Date(), updatedAt: new Date() },
      { teamId: 5, userId: 6, createdAt: new Date(), updatedAt: new Date() }, //Alexis
      { teamId: 6, userId: 7, createdAt: new Date(), updatedAt: new Date() }, //Arturo
    ]),

  down: (queryInterface) => queryInterface.bulkDelete("Players", null, {}),
};
