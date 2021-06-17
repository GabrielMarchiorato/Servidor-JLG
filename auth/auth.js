const jwt = require('jsonwebtoken');
const auth = require('./app.json');

function gerarToken(usuario){
    return jwt.sign({id : usuario.id}, auth.appId, {
        expiresIn: 3600
    });
}

function autorizar(req, res, next){
     const authHeader = req.headers.authorization;
    // if(!authHeader){
    //     return res.status(401).send({error: 'O token não foi enviado!'});
    // }

    const partes = authHeader.split(' ');
    if(partes.lenght !== 2 ){
        return res.status(401).send({error: 'Token incompleto!'});
    }

    const {tipo, token} = partes;
    if(!/^Bearer$/i.test(tipo)){
        return res.status(401).send({error: 'Token mal formado!'});
    }

    jwt.verify(token, auth.appId, (err, usuario) => {
        if (err){
            return res.status(401).send({error: 'Token inválido!'});
        }
        req.usuarioLogadoId = usuario.id;
        return next();
    });
}

module.exports = {
    gerarToken,
    autorizar
}