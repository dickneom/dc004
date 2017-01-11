var express = require('express')
var router = express.Router()

// app.set('views', '../views')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Dress Closet' })
})

router.get('/login', function (req, res) {
  res.render('users/login', { title: 'Dress Closet' })
})

router.get('/register', function (req, res) {
  res.render('users/register', { title: 'Dress Closet' })
})

router.get('/dresses', function (req, res) {
  res.render('vestidos', { title: 'Dress Closet' })
})

router.get('/dress', function (req, res) {
  res.render('vestido', { title: 'Dress Closet' })
})


module.exports = router
