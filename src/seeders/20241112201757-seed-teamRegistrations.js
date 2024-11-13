module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('TeamRegistrations', [
    {
      teamId: 1, 
      tournamentSlug: 'liga-cai-uc',
      status: 'Aceptado',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      teamId: 2, 
      tournamentSlug: 'liga-cai-uc',
      status: 'Pendiente',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('TeamRegistrations', null, {}),
};
