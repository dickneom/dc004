// /models/users.js

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    alias: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {args: true, msg: 'El alias no puede estar vacio'}
      }
    },
    nombre: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {args: true, msg: 'El nombre no puede estar vacio'}
      }
    },
    apellido: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {args: true, msg: 'El apellido no puede estar vacio'}
      }
    },
    telefono: {
      type: DataTypes.TEXT,
      validate: {
        isNumeric: {args: true, msg: 'El telefono solo puede contener numeros'}
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {args: true, msg: 'El email no puede estar vacio.'},
        isEmail: {args: true, msg: 'Debe ingresar un email valido.'}
      }
    },
    clave: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
      notNull: true,
      validate: {
        notEmpty: {args: true, msg: 'La clave no puede estar vacio'}
      }
    },
    autenticado: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {
    tableName: 'usuarios',
    getterMethods: {
      fullName: function () {
        var nombre = this.getDataValue('nombre')
        var apellido = this.getDataValue('apellido')
        var fullName = nombre + ' ' + apellido
        return fullName
      }
    }
    // aqui faltan las relaciones
  })

  return User
}
