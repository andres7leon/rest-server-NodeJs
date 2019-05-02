const jwt = require('jsonwebtoken');

//===========================
// Verificar Token
//===========================

let verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decode) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decode.usuario;
        next();

    });


};

//===========================
// Verificar Token
//===========================

let verificarAdminRol = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: 'El usuario no es administrador'
        });
    }



}

//===========================
// Verificar Token img
//===========================

let verificarTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decode) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decode.usuario;
        next();

    });
}


module.exports = {
    verificarToken,
    verificarAdminRol,
    verificarTokenImg
}