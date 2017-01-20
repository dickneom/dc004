// /routes/anonimo.js
// Rutas:
// /login GET
// /login POST
// /register GET ok
// /register POST ok
// /register/:verif GET ok
// /pass_recover GET
// /pass_recover POST
// /pass_recover_change/:code GET
// /pass_recover_change POST

var express = require('express')
var router = express.Router()

var db = require('../models/db')
var control = require('../models/control')

router.get('/login', function (req, res) {
  console.log('******************* Atendiendo la ruta: /login GET')
  res.render('anonymous/login', {
    pageTitle: 'Ingreso',
    pageName: 'login',
    user: null,
    errors: null
  })
})

router.post('/login', function (req, res) {
  console.log('******************* Atendiendo la ruta: /login POST')
  var email = req.body.email
  var password = req.body.password
  var rememberme = req.body.rememberme

  control.login(email, password, rememberme, function (error, user) {
    if (error) {
      console.log(error)
      res.render('anonymous/login', {
        pageTitle: 'Ingreso',
        pageName: 'login',
        user: null,
        error: error
      })
    } else {
      // req.session.userLog = user
      control.sessionInit(req, res, user)
      res.redirect('/')
      // res.render('home/home', {pageTitle: '', pageName: 'home', user: user})
    }
  })
})

router.get('/register', function (req, res) {
  console.log('******************* Atendiendo la ruta: /register GET')
  res.render('anonymous/register', {
    pageTitle: 'Registro',
    pageName: 'register',
    user: null,
    errors: null})
})

router.post('/register', function (req, res) {
  console.log('******************* Atendiendo la ruta: /register POST')

  var user = {}
  user.id = req.body.id
  user.nickname = req.body.nickname
  user.firstname = req.body.firstname
  user.lastname = req.body.lastname
  user.phone = req.body.phone
  user.email = req.body.email
  user.birthdate = req.body.birthdate
  user.password = req.body.password

  var pass = req.body.password1
  var clavesIguales = true
  if (user.password !== pass) {
    user.clave = ''
    clavesIguales = false
  }

  if (user) { // Crear nuevo
    console.log('*** Crear nuevo ' + user)
    user.password = control.encript(user.password)
    db.User.create(user)
    .then(function (userNew) {
      console.log('****** Registro creado correctamente!')
      //
      // ENVIAR EMAIL **************************************
      //
      res.render('anonymous/register_success', {
        pageTitle: 'Registro',
        pageName: 'register_success',
        title: 'Email de confirmacion',
        user: userNew,
        errors: null
      })
    })
    .catch(function (errors) {
      console.log('****** ERROR. No se registraron los datos!')
      // console.log(errors)
      var es = errors.errors
      for (var i = 0; i < es.length; i++) {
        var error = es[i]
        if (error.path === 'clave' && !clavesIguales) {
          es[i].message = 'Las contraseñas no son iguales'
        }
        console.log('********* Error ' + i + ' error ' + error.message)
      }
      res.render('anonymous/register', {
        pageTitle: 'Registro',
        pageName: 'register',
        user: user,
        errors: errors.errors
      })
    })
  }
})

router.get('/register/:verif', function (req, res) {
  // FALTA CHEQUEAR QUE NO EXCEDA EL TIEMPO DE ESPERA (UNOS 15 MINUTOS)
  console.log('*** Atendiendo la ruta /register/:verif')
  var code = req.params.verif

  db.User.findOne({
    where: {
      id: code
    }
  }).then(function (user) {
    console.log('****** Autenticando: ' + user.nickname)
    user.update({authenticated: true}).then(function () {
      control.sessionInit(req, res, user)
      res.render('anonymous/register_verified', {pageTitle: 'Usuario autenticado', user: user})
    }).cacth(function (error) {
      res.render('error', error)
    })
  }).catch(function (error) {
    console.log('****** ERROR: ' + error)
  })
})

router.get('/pass_recover', function (req, res) {
  console.log('******************* Atendiendo la ruta: /pass_recover GET')
  res.render('anonymous/pass_recover', {
    pageTitle: 'Recuperar contraseña',
    pageName: 'pass_recover',
    user: null,
    errors: null
  })
})

router.post('/pass_recover', function (req, res) {
  console.log('******************* Atendiendo la ruta: /pass_recover POST')
  var email = req.body.email
  var error

  if (email) {
    db.User.findOne({
      where: {
        email: email,
        authenticated: true
      }
    }).then(function (user) {
      if (user) {
        console.log('User: ' + user.id + ' email: ' + user.email)
        //
        //  SE DEBE ENVIAR UN CODIGO ESPECIAL
        //  ENVIAR EMAIL, CON UN ENLACE QUE CADUCA
        //
        res.render('anonymous/pass_recover_email', {
          pageTitle: 'Recuperar contraseña',
          pageName: 'pass_recover_email',
          email: email,
          user: user,
          errors: null
        })
      } else {
        error = 'Email no encontrado'
        res.render('anonymous/pass_recover', {
          pageTitle: 'Recuperar contraseña',
          pageName: 'pass_recover',
          user: null,
          errors: error
        })
      }
    }).catch(function (error) {
      console.log('"****** ERROR: ' + error)
    })
  }
})

router.get('/pass_recover_change/:code', function (req, res) {
  console.log('******************* Atendiendo la ruta: /pass_recover_chage/:code GET')
  var code = req.params.code

  db.User.findOne({
    where: {
      id: code
    }
  }).then(function (user) {
    //
    //  SE DEBE ENVIAR UN CODIGO ESPECIAL, NO EL ID DEL USUARIO
    //  FALTA REVISAR LA CADUCIDAD DEL ENLACE
    //
    // if (enlaceCaducado) -> render(error)

    if (user) {
      console.log('User: ' + user.id + ' email: ' + user.email)
      res.render('anonymous/pass_recover_change', {
        pageTitle: 'Recuperar contraseña',
        pageName: 'pass_recover_change',
        userId: user.id,
        errors: null
      })
    } else {
      console.log('Usuario no encontrado')
      var error = 'No se encontro el usuario'
      res.render('anonymous/pass_recover_error', {
        pageTitle: 'Recuperar contraseña error',
        pageName: 'pass_recover_error',
        user: null,
        errors: error
      })
    }
  }).catch(function (error) {
    console.log('Usuario: no encontrado')
    console.log('****** ERROR: ' + error)
  })
})

router.post('/pass_recover_change', function (req, res) {
  console.log('******************* Atendiendo la ruta: /pass_recover_change POST')
  var password = req.body.password
  var password1 = req.body.password1
  var userId = req.body.id

  if (password === password1) {
    db.User.findOne({
      where: {
        id: userId
      }
    }).then(function (user) {
      console.log('****** Actualizando password de: ' + user.nickname)
      if (user.authenticated) {
        var pass = control.encript(password)
        user.update({password: pass}).then(function (user) {
          control.sessionInit(req, res, user)
          res.render('anonymous/pass_recover_success', {
            pageTitle: 'Recuperacion de contraseña exitosa',
            pageName: 'pass_recover_success',
            userId: userId,
            errors: error
          })
        }).catch(function (error) {
          console.log(error)
          res.render('error', error)
        })
      } else {
        var error = 'Usuario no autenticado, complete el registro'
        console.log(error)
        res.render('anonymous/pass_recover_change', {
          pageTitle: 'Recuperar contraseña',
          pageName: 'pass_recover_change',
          userId: userId,
          errors: [error]
        })
      }
    })
  } else {
    var error = 'Las contraseñas no coinciden'
    console.log(error)
    res.render('anonymous/pass_recover_change', {
      pageTitle: 'Recuperar contraseña',
      pageName: 'pass_recover_change',
      userId: userId,
      errors: [error]
    })
  }
})

router.get('/logout', function (req, res) {
  console.log('******************* Atendiendo la ruta: /logout GET')
  req.session.userLoged = null
  res.redirect('/')
})

module.exports = router
