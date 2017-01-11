var express = require('express')
var router = express.Router()

app.set('views', '../views'))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Dress Closet' })
})

module.exports = router
