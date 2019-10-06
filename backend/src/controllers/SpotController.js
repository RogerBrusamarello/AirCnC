const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {

    async index(req, res){
        // retornar umas lista de spotes
        //  filtra tecnologias

        const { tech } = req.query; // query: Acessar query params (para filtros)

        // procurar dentro do array uma String
        const spots = await Spot.find({ techs: tech });
        return res.json(spots); // retornando a pesquisa
    },

    async store(req, res) {

        // Corpo Da Requisição
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;  // headers: contexto da aquisição/autenticação. Ex: idioma do usuario para envio de rsposta so software

        // validação de existencia de 'user'
        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({ error: 'User does exists '});
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            techs: techs.split(',').map(tech => tech.trim()), // separa os espaços em virgulas, pq BD recebe em array, e no front como String
            company,
            price
        })

        return res.json(spot);
    }
};