const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
    const token_header = req.headers.auth; // Vai ter que passar o auth no HEADERS do Postman

    if (!token_header) return res.send({ error: 'Autenticação recusada! Obs: Provavelmente você não colocou suas credenciais no HEADERS do Postman' });

    jwt.verify(token_header, config.jwt_pass, (err, decoded) => {//Verificar se esse token HEADER é valido ou ñ 
        if (err) return res.send({ error: 'Token inválido' }); //se ñ bater ele já vai acusar erro
        res.locals.auth_data = decoded; //Guardei aqui no locals quem é o cara que está acessando 
        return next();//se ñ for invalido, ele estará VALIDO....kkkk
    })
}
module.exports = auth;//Expostar essa propria função