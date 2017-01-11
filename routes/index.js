var express = require('express')
var router = express.Router()

// app.set('views', '../views')
var db = require('../models/db')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { titulo: '', ventana: 'index' })
})

// usuarios
router.get('/login', function (req, res) {
  res.render('users/login', { titulo: 'Ingreso', ventana: 'login' })
})

// inicia la session a un usuario autenticado
router.post('/authenticate', function (req, res, next) {
  var email = req.body.email
  var password = req.body.clave
  var recordar = req.body.recordar

  db.users.find({where: {
    email: email,
    clave: password
  }})
  .then(function (user) {
    if (user) {
      console.log('Usuario encontrado: ' + user.nombre)

      if (user === null) {
        res.render('/login', {error: true})
      } else {
        req.session.usuarioLogeado = {
          id: user.id,
          email: user.email
        }
        res.render('dresses')
      }
    } else {
      console.log('Usuario no encontrado')
      res.send('Usuario no encontrado')
    }
  })
  .catch(function (errores) {
    console.log('Error al realizar la busqueda')
  })
})

router.get('/register', function (req, res) {
  res.render('users/register', { title: 'Registro', ventana: 'register' })
})

router.get('', function (req, res) {

})

// vestidos
// ruta para ver los vestidos, usuarios no autenticados
router.get('/dresses_nr', function (req, res) {
  res.render('dresses_nr', { title: 'Vestidos', ventana: 'dresses_nr' })
})

router.get('/dress_nr', function (req, res) {
  res.render('dress_nr', { title: 'Vestido', ventana: 'dress_nr' })
})

// ruta para ver los vestidos, usuarios autenticados
router.get('/dresses', function (req, res) {
  res.render('dresses_nr', { title: 'Vestidos', ventana: 'dresses' })
})

module.exports = router
