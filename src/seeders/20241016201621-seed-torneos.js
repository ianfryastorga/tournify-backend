
module.exports =  {
  up: (queryInterface) => queryInterface.bulkInsert('Torneos', [
    {
      Nombre: 'Torneo de Fútbol',
      Fecha: '2024-11-30',
      Ubicación: 'Estadio Nacional',
      Estado: 'En curso',
      Clasificación: 'Fútbol',
      ID_Organizador: 1,
      Image: "https://example.com/images/product1.jpg", // Actualizar los links de imagen!!!
                                                   // Si no va a fallar la carga de foto en la vista! 
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
      Image: "https://example.com/images/product2.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nombre: 'Torneo de Básquetbol',
      Fecha: '2023-10-01',
      Ubicación: 'Estadio Nacional',
      Estado: 'Terminado',
      Clasificación: 'Básquetbol',
      Image: "https://example.com/images/product3.jpg",
      ID_Organizador: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Torneos', null, {}),
}