module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Tournaments', [
    {
      name: 'Torneo de Fútbol',
      date: '2024-11-30',
      location: 'Estadio Nacional',
      status: 'En curso',
      classification: 'Fútbol',
      organizerId: 1,
      image: "https://example.com/images/product1.jpg", // Actualizar los links de imagen!!!
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Torneo de Vóley',
      date: '2024-12-01',
      location: 'Estadio Nacional',
      status: 'En curso',
      classification: 'Vóley',
      organizerId: 1,
      image: "https://example.com/images/product2.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Torneo de Básquetbol',
      date: '2023-10-01',
      location: 'Estadio Nacional',
      status: 'Terminado',
      classification: 'Básquetbol',
      organizerId: 1,
      image: "https://example.com/images/product3.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Tournaments', null, {}),
}
