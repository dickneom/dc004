var express = require('express')
var router = express.Router()

// app.set('views', '../views')
var db = require('../models/db')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { titulo: 'Dress Closet', ventana: 'index' })
})

// usuarios
router.get('/login', function (req, res) {
  res.render('users/login', { titulo: 'Ingreso', ventana: 'login', error: null })
})

// inicia la session a un usuario autenticado
router.post('/login', function (req, res, next) {
  var email = req.body.email
  var password = req.body.clave
  var recordar = req.body.recordar

  // var valor = login(email, password)

  login(email, password, function (valor) {
    if (valor.error) {
      console.log(valor.error)
      res.render('users/login', { titulo: 'Ingreso', ventana: 'login', error: valor.error })
    } else {
      req.session.usuarioLogeado = valor.user
      res.render('dresses', { user: req.session.usuarioLogeado })
    }
  })
})

function login (email, password, callback) {
  db.users.find({where: {
    email: email,
    clave: password
  }})
  .then(function (user) {
    if (user) {
      if (user.autenticado) {
        console.log('Usuario encontrado: ' + user.nombre)
        callback({
          error: null,
          user: user
        })
      } else {
        console.log('Usuario no autenticado')
        callback({
          error: 'Usuario no autenticado',
          user: null
        })
      }
    } else {
      console.log('Usuario no encontrado')
      callback({
        error: 'Usuario no encontrado',
        user: null
      })
    }
  })
  .catch(function (errores) {
    console.log('Error al realizar la busqueda')
  })
}

router.get('/register', function (req, res) {
  res.render('users/register', { titulo: 'Registro', ventana: 'register', user: null, errores: null })
})

router.post('/register', function (req, res) {
  var user = {}

  user.id = req.body.id
  user.alias = req.body.alias
  user.nombre = req.body.nombre
  user.apellido = req.body.apellido
  user.telefono = req.body.telefono
  user.email = req.body.email
  user.clave = req.body.clave
  var clave1 = req.body.clave1
  var clavesIguales = true
  if (clave1 !== user.clave) {
    user.clave = ''
    clavesIguales = false
  }

  if (user.id !== '') { // Actualizar
    console.log('Actualizar')
    db.users.findById(user.id)
    .then(function (userEncontrado) {
      db.users.save(user)
      .then(function (userNew) {
        console.log('Registro actualizado correctamente!')
        res.redirect()
      })
    })
  } else { // Crear nuevo
    console.log('Crear nuevo')
    db.users.create(user)
    .then(function (userNew) {
      console.log('Registro creado correctamente!')
      res.render('users/email_verif', {titulo: 'Email de confirmación', user: userNew})
    })
    .catch(function (errores) {
      console.log('ERROR. No se registraron los datos!')
      console.log(errores)
      var es = errores.errors
      for (var i = 0; i < es.length; i++) {
        var error = es[i]
        if (error.path === 'clave' && !clavesIguales) {
          es[i].message = 'Las contraseñas no son iguales'
        }
        console.log('Error ' + i + ' error ' + error.message)
      }
      res.render('users/register', {
        titulo: 'Registro',
        ventana: 'register',
        user: user,
        errores: errores.errors
      })
    })
  }
})

// vestidos
// ruta para ver los vestidos, usuarios no autenticados
router.get('/dresses_nr', function (req, res) {
  res.render('dresses_nr', { titulo: 'Vestidos', ventana: 'dresses_nr' })
})

router.get('/dress_nr', function (req, res) {
  res.render('dress_nr', { titulo: 'Vestido', ventana: 'dress_nr' })
})

// ruta para ver los vestidos, usuarios autenticados
router.get('/dresses', function (req, res) {
  res.render('dresses', { titulo: 'Vestidos', ventana: 'dresses' })
})

module.exports = router
