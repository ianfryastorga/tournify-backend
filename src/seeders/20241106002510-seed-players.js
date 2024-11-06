module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("Players", [
      {
        teamId: 1, // MacroHard OnFire
        userId: 1, // Tomás González
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 1, // MacroHard OnFire
        userId: 2, // María Pérez
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 1, // MacroHard OnFire
        userId: 3, // Martini Ramirez
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 2, // Creyentes de Dios
        userId: 4, // Joaquín Paiva
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 2, // Creyentes de Dios
        userId: 1, // Tomás González
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 2, // Creyentes de Dios
        userId: 2, // María Pérez
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 3, // Los Ateos
        userId: 3, // Martini Ramirez
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 3, // Los Ateos
        userId: 4, // Joaquín Paiva
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 3, // Los Ateos
        userId: 1, // Tomás González
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 4, // Los Dormilones
        userId: 2, // María Pérez
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 4, // Los Dormilones
        userId: 3, // Martini Ramirez
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamId: 4, // Los Dormilones
        userId: 4, // Joaquín Paiva
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface) => queryInterface.bulkDelete("Players", null, {}),
};
