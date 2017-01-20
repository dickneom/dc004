var express = require('express')
var router = express.Router()

// app.set('views', '../views')
// var db = require('../models/db')
// var control = require('../models/control')

// var routeUsers = require('./users')
// var routeDresses = require('./dresses')
var routeAnonymous = require('./anonymous')

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.userLoged) {
    res.render('home/home', { pageTitle: '', title: 'Dress Closet', pageName: 'home', user: req.session.userLoged })
  } else {
    res.render('index', { pageTitle: '', title: 'Dress Closet', pageName: 'index' })
  }
})

router.use(routeAnonymous)
// router.use(routeUsers)
// router.use(routeDresses)

// vestidos
// ruta para ver los vestidos, usuarios no autenticados
// router.get('/dresses_nr', function (req, res) {
//   res.render('dresses_nr', { titulo: 'Vestidos', ventana: 'dresses_nr' })
// })

// router.get('/dress_nr', function (req, res) {
//   res.render('dress_nr', { titulo: 'Vestido', ventana: 'dress_nr' })
// })

module.exports = router
