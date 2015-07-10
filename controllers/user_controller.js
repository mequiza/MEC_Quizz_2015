var users = { admin: {id:1, username:"admin", password:"1234321"},
              paco:  {id:2, username: "paco", password:"5678765"}
            };

// Comprueba si el usuario está registrados en users
// si falla autenticación ó hay errores, se ejecuta callback(error).
exports.autenticar = function(login, password, callback) {
  if (users[login]){
    if (password === users[login].password){
      callback(null, users[login]);
    }
    else {
      callback(new Error('Password erróneo.')); }
  } else { callback(new Error('No existe el usuario.'));}
};            
