// /routes/dresses.js

var express = require('express')
var router = express.Router()

// var db = require('../models/db')

/*
/dress          GET   index - index
/dress/create   GET   crear - create
/dress          POST  grabar - store
/dress/:id      GET   mostrar - show
/dress/:id/edit GET   editar - edit
/dress/:id      PUT/PATCH actualizar - update
/dress/:id      DELETE    borrar - destroy
*/

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

router.get('/dresses/create', function (req, res) {

})

router.get('/dresses/:dress_id/edit', function (req, res) {

})

module.exports = router
