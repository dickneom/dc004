var db = require('./db')

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
