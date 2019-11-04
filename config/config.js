const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://usuario_admin:XhQ4jDaE2x5buRLY@clusterapi-rppdz.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'essaeasenha',
                jwt_expires_in: '1d'
            }

        case 'homo':
            return {
                bd_string: 'mongodb+srv://usuario_admin:XhQ4jDaE2x5buRLY@clusterapi-rppdz.mongodb.net/test?retryWrites=true&w=majorityerwerwerwe',
                jwt_pass: 'aabshdbasbdahsdasd',
                jwt_expires_in: '5d'
            }
        case 'prod':
            return {
                bd_string: 'mongodb+srv://usuario_admin:XhQ4jDaE2x5buRLY@clusterapi-rppdz.mongodb.net/test?retryWrites=true&w=majorityasdasdasd',
                jwt_pass: 'jnasdudjfhiuasdufha898HUHUIHUIIJnbijhbniuninjnin',
                jwt_expires_in: '7d'
            }
    }

}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();