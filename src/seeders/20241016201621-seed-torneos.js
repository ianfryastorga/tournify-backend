
module.exports =  {
  up: (queryInterface) => queryInterface.bulkInsert('Torneos', [
    {
      Nombre: 'Torneo de Fútbol',
      Fecha: '2024-11-30',
      Ubicación: 'Estadio Nacional',
      Estado: 'En curso',
      Clasificación: 'Fútbol',
      ID_Organizador: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nombre: 'Torneo de Vóley',
      Fecha: '2024-12-01',
      Ubicación: 'Estadio Nacional',
      Estado: 'En curso',
      Clasificación: 'Vóley',
      ID_Organizador: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nombre: 'Torneo de Básquetbol',
      Fecha: '2023-10-01',
      Ubicación: 'Estadio Nacional',
      Estado: 'Terminado',
      Clasificación: 'Básquetbol',
      ID_Organizador: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Torneos', null, {}),
}