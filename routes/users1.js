// /routes/users.js

var express = require('express')
var router = express.Router()

var db = require('../models/db')
var control = require('../models/control')

// CAMBIO DE CLAVE
router.get('/pass_change', function (req, res) {
  var email = req.query.email
  res.render('users/pass_change', {email: email})
})

router.post('/pass_change', function (req, res) {
  var clave = req.body.clave
  var clave1 = req.body.clave1
  var userLogeado = req.usuarioLogeado
  if (clave === clave1) {
    if (userLogeado) {
      var user = userLogeado
      user.clave = clave
      user.save(['clave'])
      .then(function (userActualizado) {
        res.send('Cambio de clave realizado con exito')
      })
      .catch(function (errores) {
        res.send('No se puedo cambiar la clave')
      })
    } else {

    }
  } else {
    res.render('users/pass_change', {error: 'Las claves no coinciden.'})
  }
})

// REST - CRUD
router.route('/users')
  // recupera todos los usuarios
  .get(function (req, res) {
    res.send('Atendiendo la ruta: /users GET. Recupera todos los usuarios')
    res.render('')
  })
    // Crear usuarios
  .post(function (req, res) {
    res.send('Atendiendo la ruta: /users POST. Crea un usuario')
  })

router.route('/users/:userId')
  // Recuperar un usuario
  .get(function (req, res) {
    var userId = req.params.userId
    res.send('Atendiendo la ruta: /users/:userId GET. Recuperar el usuario: ' + userId)
  })
  // Modificar un usuario
  .put(function (req, res) {
    var userId = req.params.userId
    res.send('Atendiendo la ruta: /users/:userID PUT. Actualiza el usuario: ' + userId)
  })
  // borrar un usuario
  .delete(function (req, res) {
    var userId = req.params.userId
    res.send('Atendiendo la ruta: /users/:userId DELETE. Eliminar el usuario: ' + userId)
  })

module.exports = router
