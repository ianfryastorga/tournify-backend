module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('TeamRegistrations', [
    {
      id: '1',
      equipoId: '1',
      torneoSlug: 'liga-cai-uc',
      estado: 'Aceptado',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      equipoId: '2', 
      torneoSlug: 'liga-cai-uc',
      estado: 'Pendiente',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      equipoId: '3',
      torneoSlug: 'liga-cai-uc',
      estado: 'Rechazado',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      equipoId: '4', 
      torneoSlug: 'liga-cai-uc',
      estado: 'Aceptado',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('TeamRegistrations', null, {}),
};
