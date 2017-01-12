var Sequelize = require('sequelize')

var sequelize = new Sequelize('', '', '', {
  dialect: 'sqlite',
  storage: './db/dc.db',
  define: {
    timestamps: false,
    freezeTableName: true
  }
})

// conentando los modelos, relaciones en la base de datos en un db objeto
var db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Modelos - Tablas
db.users = require('./users')(sequelize, Sequelize)
db.dresses = require('./dresses')(sequelize, Sequelize)

// Relaciones
db.users.hasMany(db.dresses, {as: 'usuario_id'})

module.exports = db
