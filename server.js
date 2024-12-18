const dotenv = require('./dotenv.js');
const app = require('./app.js');

app.listen(process.env.BACKENDPORT, () => {
    console.log('Servidor rodando na porta 3000');
});