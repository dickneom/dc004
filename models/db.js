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
db.User = require('./users')(sequelize, Sequelize)
db.Dress = require('./dresses')(sequelize, Sequelize)

// Relaciones
db.User.hasMany(db.Dress, {foreignKey: 'user_id', as: 'user_id'})

module.exports = db
