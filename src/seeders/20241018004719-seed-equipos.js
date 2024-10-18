
module.exports =  {
  up: (queryInterface) => queryInterface.bulkInsert('Equipos', [
    {
      Nombre: 'MacroHard OnFire',
      ID_Representante: 1, 
      ID_Torneo: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nombre: 'Creyentes de Dios',
      ID_Representante: 2, 
      ID_Torneo: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Equipos', null, {}),
}