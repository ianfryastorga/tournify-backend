module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('TeamRegistrations', [
    {
      teamId: 1, // ID correspondiente al equipo "Ingeniería"
      tournamentSlug: 'liga-cai-uc', // Slug del torneo "Liga CAI UC"
      status: 'Accepted',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId: 2, // ID correspondiente al equipo "Medicina"
      tournamentSlug: 'liga-cai-uc',
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
   
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('TeamRegistrations', null, {}),
};
