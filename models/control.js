var db = require('./db')

function login (email, password, callback) {
  var error
  db.users.find({where: {
    email: email,
    clave: password
  }})
  .then(function (user) {
    if (user) {
      if (user.autenticado) {
        console.log('Usuario encontrado: ' + user.nombre)
        callback(null, user)
      } else {
        console.log('Usuario no autenticado')
        error = 'Usuario no autenticado'
        callback(error)
      }
    } else {
      console.log('Usuario no encontrado')
      error = 'Usuario no encontrado'
      callback(error)
    }
  })
  .catch(function (errores) {
    console.log('Error al realizar la busqueda')
  })
}

function validarSesion (req, res, next) {
  console.log('Validando session del usuario')
  if (typeof req.session.usuarioLogeado === 'undefined') {
    res.redirect('/login')
  } else {
    // Ya esta logeado
    next()
  }
}

module.exports.login = login
module.exports.validarSesion = validarSesion
