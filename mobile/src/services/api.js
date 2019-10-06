import axios from 'axios';
//pega as rotas do nosso backend, para salvar no banco de dados
const api = axios.create({
    baseURL: 'http://192.168.1.112:3333',
});

export default api;
