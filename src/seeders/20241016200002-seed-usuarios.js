
module.exports =  {
  up: (queryInterface) => queryInterface.bulkInsert('Usuarios', [
    {
      Nombre: 'Tomás González',
      Correo: 'tgonza@uc.cl',
      Contraseña: '1234',
      Género: 'Masculino',
      Rol: 'Organizador',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nombre: 'María Pérez',
      Correo: 'mperez@uc.cl',
      Contraseña: '1234',
      Género: 'Femenino',
      Rol: 'Jugador',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Nombre: 'Martini Ramirez',
      Correo: 'mabe@uc.cl',
      Contraseña: '1234',
      Género: 'Femenino',
      Rol: 'Administrador',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Nombre: 'Juaquín Paiva',
      Correo: 'paiva@uc.cl',
      Contraseña: '1234',
      Género: 'Masculino',
      Rol: 'Jugador',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Usuarios', null, {}),
}