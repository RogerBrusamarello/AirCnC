const Booking = require('../models/Booking');

module.exports = {

    // store: Cria uma sessão
    async store(req, res) {

        // buscando usuario logado (fazendo a reserva)
        const { user_id } = req.headers;

        // qual spot está fazendo a reserva
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        // preencher dados de usuario e spot
        await booking.populate('spot').populate('user').execPopulate();


        const ownerSocket = req.connectedUsers[booking.spot.user];

        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};