// /models.dresses.js

module.exports = function (sequelize, DataTypes) {
  var Dress = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    colorId: {
      type: DataTypes.INTEGER,
      field: 'color_id'
    },
    brand: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.NUMERIC
    },
    priceOriginal: {
      type: DataTypes.NUMERIC
    },
    categoId: {
      type: DataTypes.INTEGER
    },
    long: {
      type: DataTypes.TEXT
    },
    size: {
      type: DataTypes.TEXT
    },
    user_id: {  // id el usuario dueño del vestido
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    },
    publishedAt: {
      type: DataTypes.DATE
    },
    soldAt: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'vestidos',
    timestamp: true,
    paranoid: true
    // aqui faltan las relaciones
  })

  return Dress
}
