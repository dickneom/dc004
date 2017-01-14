// /routes/dresses.js

var express = require('express')
var router = express.Router()

var db = require('../models/db')

/* GET dresss listing. */
/* router.get('/dresss', function(req, res, next) {
  res.send('respond with a resource');
}); */
// ruta para ver los vestidos, usuarios autenticados
router.get('/dresses_grid', function (req, res) {
  var limit
  var page

  if (req.query.limit) {
    limit = req.query.limit
  } else {
    limit = 3
  }
  if (req.query.page) {
    page = req.query.page - 1
  } else {
    page = 0
  }
  var offset = limit * page
  db.dresses.findAll({
    limit: limit,
    offset: offset
  })
  .then(function (dresses) {
    res.render('./dresses/dress_grid', { titulo: 'Vestidos', ventana: 'dresses', dresses: dresses })
  })
})

router.route('/dresses')
  // recupera todos los vestidos
  .get(function (req, res) {
    res.send('Atendiendo a la ruta /dresses GET. Recupera todos los vestidos')
  })
  // Crear vestidos
  .post(function (req, res) {
    res.send('Atendiendo a la ruta /dresses POST. Crea un vestido')
  })

router.route('/dresses/:dress_id')
  // Recuperar un vestido
  .get(function (req, res) {
    var dressId = req.params.dressId
    res.send('Atendiendo a la ruta /dresses/:dressId GET. Recuperar el vestido: ' + dressId)
  })
  // Modificar un vestido
  .put(function (req, res) {
    var dressId = req.params.dressId
    res.send('Atendiendo a la ruta /dresses/:dressId PUT. Actualiza el vestido: ' + dressId)
  })
  // borrar un vestido
  .delete(function (req, res) {
    var dressId = req.params.dressId
    res.send('Eliminar el vestido: ' + dressId)
  })

module.exports = router
