// /routes/dresses.js

var express = require('express')
var router = express.Router()

/* GET dresss listing. */
/* router.get('/dresss', function(req, res, next) {
  res.send('respond with a resource');
}); */

router.route('/')
  // Crear vestidos
  .post(function (req, res) {
    res.send('Crea un vestido')
  })
  // recupera todos los vestidos
  .get(function (req, res) {
    res.send('Recupera todos los vestidos')
  })

router.route('/:dress_id')
  // Modificar un vestido
  .put(function (req, res) {
    var dressId = req.params.dress_id
    res.send('Actualiza el vestido: ' + dressId)
  })
  // Recuperar un vestido
  .get(function (req, res) {
    var dressId = req.params.dress_id
    res.send('Recuperar el vestido: ' + dressId)
  })
  // borrar un vestido
  .delete(function (req, res) {
    var dressId = req.params.dress_id
    res.send('Eliminar el vestido: ' + dressId)
  })

module.exports = router
