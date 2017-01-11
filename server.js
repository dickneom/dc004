var express = require('express')
var app = express()

// var Sequelize = require('sequelize')
// 
// var sequelize = new Sequelize('', '', '', {
//     dialect: 'sqlite',
//     storage: './db/dc.db',
//     define: {
//         timestamps: false,
//         // deshabilita la convencion por default para el nombre de las tablas
//         freezeTableName: true
//     }
// })

var db = require('./models/db')

//app.use(user)

app.listen(3000)
console.log('Listo')

app.use('/', function(req, res) {
    res.send('Hola')
})

db.users.findById(1).then(function(usuario) {
    console.log(usuario.nombre)
})
    
