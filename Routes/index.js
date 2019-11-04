const express = require('express');
const router = express.Router(); //instanciando a rota, que no caso é a pasta ROUTER
const auth = require('../middlewares/auth');//importanto a função de endpoint autenticado

//endPoint´s desta rota expecifica
router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({ message: 'Essa informação é muito importante. Usuários não autorizados não deveriam recebê-la! Se você recebeu é porque você está autorizado...rs' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'Tudo ok com o método POST da raiz!' });
});

//exportando o modulo
module.exports = router;