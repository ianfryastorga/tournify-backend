module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("Matches", [
      {
        date: "2024-06-16",
        time: "16:00:00",
        team1: 1, // ID del equipo MacroHard OnFire
        team2: 2, // ID del equipo Creyentes de Dios
        result: "2-1",
        tournamentId: 1, // Cambiado de `tournamentSlug` a `tournamentId`, usa el ID de "Liga CAI UC"
        status: "Finalizado",
        tournamentSlug: 'liga-cai-uc',
        events: JSON.stringify([
          {
            minute: 10,
            type: "Gol",
            player: "Juan Pérez",
            team: "MacroHard OnFire",
          },
          {
            minute: 45,
            type: "Gol",
            player: "Carlos López",
            team: "Creyentes de Dios",
          },
          {
            minute: 70,
            type: "Gol",
            player: "Miguel Torres",
            team: "MacroHard OnFire",
          },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2024-06-18",
        time: "18:00:00",
        team1: 3, // ID del equipo Los Ateos
        team2: 4, // ID del equipo Los Dormilones
        result: "1-1",
        tournamentId: 1, // Usa el ID de "Liga CAI UC"
        status: "Finalizado",
        events: JSON.stringify([
          {
            minute: 30,
            type: "Gol",
            player: "Andrés Silva",
            team: "Los Ateos",
          },
          {
            minute: 60,
            type: "Gol",
            player: "Luis Gómez",
            team: "Los Dormilones",
          },
        ]),
        tournamentSlug: 'liga-cai-uc',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
    ]),

  down: (queryInterface) => queryInterface.bulkDelete("Matches", null, {}),
};
