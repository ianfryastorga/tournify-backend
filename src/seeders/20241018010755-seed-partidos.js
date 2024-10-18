
module.exports =  {
  up: (queryInterface) => queryInterface.bulkInsert('Partidos', [
    {
      Fecha: '2023-10-01',
      Hora: '12:00:00',
      ID_Equipo1: 1,
      ID_Equipo2: 2,
      Resultado: '1-0',
      ID_Torneo: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

 
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Partidos', null, {}),
}