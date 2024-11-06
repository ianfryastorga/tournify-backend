module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Matches', [
    {
      date: '2024-06-16',
      time: '16:00:00',
      team1: 1, // ID de Ingeniería
      team2: 2, // ID de Medicina
      result: '2-1',
      tournamentSlug: 'liga-cai-uc',
      status: 'Finalizado',
      events: JSON.stringify([
        { minute: 10, type: 'Gol', player: 'Juan Pérez', team: 'Ingeniería FC' },
        { minute: 45, type: 'Gol', player: 'Carlos López', team: 'Medicina United' },
        { minute: 70, type: 'Gol', player: 'Miguel Torres', team: 'Ingeniería FC' },
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      date: '2024-06-18',
      time: '18:00:00',
      team1: 3, // ID de Derecho
      team2: 4, // ID de Arquitectura
      result: '1-1',
      tournamentSlug: 'liga-cai-uc',
      status: 'Finalizado',
      events: JSON.stringify([
        { minute: 30, type: 'Gol', player: 'Andrés Silva', team: 'Derecho Club' },
        { minute: 60, type: 'Gol', player: 'Luis Gómez', team: 'Arquitectura SC' },
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      date: '2024-07-20',
      time: '15:00:00',
      team1: 1, // ID de Ingeniería
      team2: 4, // ID de Arquitectura
      result: '',
      tournamentSlug: 'liga-cai-uc',
      status: 'Pendiente',
      events: JSON.stringify([]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      date: '2024-07-22',
      time: '17:00:00',
      team1: 2, // ID de Medicina
      team2: 3, // ID de Derecho
      result: '',
      tournamentSlug: 'liga-cai-uc',
      status: 'Pendiente',
      events: JSON.stringify([]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  
  down: (queryInterface) => queryInterface.bulkDelete('Matches', null, {}),
};
