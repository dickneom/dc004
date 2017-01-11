// /models/users.js

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    alias: {
      type: DataTypes.TEXT
    },
    nombre: {
      type: DataTypes.TEXT
    },
    apellido: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.TEXT
    },
    clave: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'usuarios'
    // aqui faltan las relaciones
  })

  return User
}
