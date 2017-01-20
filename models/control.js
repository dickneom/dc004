var db = require('./db')

function login (email, pass, rememberme, callback) {
  // FALTA LA PARTE DE RECUERDAME
  var error
  var password = encript(pass)
  db.User.findOne({where: {
    email: email,
    password: password
  }})
  .then(function (user) {
    if (user) {
      if (user.authenticated) {
        console.log('Usuario encontrado: ' + user.fullname)
        callback(null, user)
      } else {
        error = 'Usuario no autenticado'
        console.log(error)
        callback(error)
      }
    } else {
      error = 'Usuario y/o contraseña no validos'
      console.log(error)
      callback(error)
    }
  })
  .catch(function (errores) {
    error = 'Error al realizar la busqueda'
    console.log(error)
    callback(error)
  })
}

function encript (value) {
  var encript = value + 'a1'
  // falta el algoritmo de algoritmo de encriptamiento
  return encript
}

function sessionInit (req, res, user) {
  req.session.userLoged = user
}

// middleware para validar si hay una session abierta
function sessionValidate (req, res, next) {
  console.log('Validando session del usuario')
  if (typeof req.session.userLoged === 'undefined') {
    res.redirect('/login')
  } else {
    // Ya esta logeado
    next()
  }
}

module.exports.login = login
module.exports.encript = encript
module.exports.sessionInit = sessionInit
module.exports.sessionValidate = sessionValidate
