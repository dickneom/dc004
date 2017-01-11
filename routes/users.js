// /routes/users.js

var express = require('express')
var router = express.Router()

/* GET users listing. */
/* router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
}); */

router.route('/')
  // Crear usuarios
  .post(function (req, res) {
    res.send('Crea un usuario')
  })
  // recupera todos los usuarios
  .get(function (req, res) {
    res.send('Recupera todos los usuarios')
  })

router.route('/:user_id')
  // Modificar un usuario
  .put(function (req, res) {
    var userId = req.params.user_id
    res.send('Actualiza el usuario: ' + userId)
  })
  // Recuperar un usuario
  .get(function (req, res) {
    var userId = req.params.user_id
    res.send('Recuperar el usuario: ' + userId)
  })
  // borrar un usuario
  .delete(function (req, res) {
    var userId = req.params.user_id
    res.send('Eliminar el usuario: ' + userId)
  })

module.exports = router
