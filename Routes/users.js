const express = require('express');
const router = express.Router(); //instanciando a rota, que no caso é a pasta ROUTER
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//FUNÇÕES AUXILIARES
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
}

//endPoint´s desta rota expecifica
router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});//Observe que não tem nada dentro do objeto Users.find({}, porque eu quero pegar uma lista de usuários
        return res.send(users);
    }
    catch (err) {
        return res.send({ error: 'Erro na consulta de usuáriosssss!' });
    }
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;// é aqui que vem email e senha

    if (!email || !password) return res.send({ error: 'Dados insufucientes!' });

    try {
        if (await Users.findOne({ email })) return res, send({ error: 'Usuário já registrado!' });//Eu não quero buscar um usuário que já existe findOne

        const user = await Users.create(req.body);
        user.password = undefined;//inpedir que ele me envie(MOSTRE) a senha do usuário
        //Enviando o usuário mais o token que vem da função
        return res.send({ user, toke: createUserToken(user.id) });//Devolver o usuário//Enviando o usuário mais o token que vem da função

    }
    catch (erro) {
        return res.send({ error: 'Erro ao buscar usuário!' });
    }
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientesss!' });//Se eu deixar de informar o email ou senha

    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.send({ error: 'Usuário não registrado!' });//Email errado

        const pass_ok = await bcrypt.compare(password, user.password);

        if (!pass_ok) return res.send({ error: 'Erro ao autenticar usuário!' });//Senha errada

        user.password = undefined;// Para ñ mostrar mais a senha cryptografada para o usuário
        return res.send({ user, toke: createUserToken(user.id) });

    }
    catch (err) {
        return res.send({ error: 'Erro ao autenticar usuário!' });//Senha errada

    }
});

//exportando o modulo
module.exports = router;