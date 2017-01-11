// /models.dresses.js

module.exports = function (sequelize, DataTypes) {
  var Dress = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.TEXT
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    colorId: {
      type: DataTypes.TEXT,
      field: 'color_id'
    }
  }, {
    tableName: 'vestidos'
    // aqui faltan las relaciones
  })

  return Dress
}
