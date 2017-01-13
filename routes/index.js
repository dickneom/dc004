var express = require('express')
var router = express.Router()

// app.set('views', '../views')
var db = require('../models/db')
var control = require('../models/control')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { titulo: 'Dress Closet', ventana: 'index' })
})

// LOGIN
router.get('/login', function (req, res) {
  res.render('users/login', { titulo: 'Ingreso', ventana: 'login', error: null })
})

// inicia la session a un usuario autenticado
router.post('/login', function (req, res, next) {
  var email = req.body.email
  var password = req.body.clave
  var recordar = req.body.recordar

  // var valor = login(email, password)

  control.login(email, password, function (valor) {
    if (valor.error) {
      console.log(valor.error)
      res.render('users/login', { titulo: 'Ingreso', ventana: 'login', error: valor.error })
    } else {
      req.session.usuarioLogeado = valor.user
      res.render('dresses', { user: req.session.usuarioLogeado })
    }
  })
})

// RECUPERAR PASSWORD
router.get('/pass_recover', function (req, res) {
  res.render('users/pass_recover')
})

router.post('/pass_recover', function (req, res) {
  var email = req.body.email
  if (email && email !== '') {
    db.users.find({where: {
      email: email
    }})
    .then(function (user) {
      //
      //  ENVIAR EMAIL
      //
      // res.send('El enlace de recuperacion de la clave fue enviado a ' + email)
      res.render('users/pass_recover_email_verif', {email: email})
    })
  } else {
    res.render('users/pass_recover', {error: 'Ingrese un email valido.'})
  }
})

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

// REGISTRAR USUARIOS
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
      //
      // ENVIAR EMAIL
      //
      res.render('users/register_email_verif', {titulo: 'Email de confirmación', user: userNew})
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
