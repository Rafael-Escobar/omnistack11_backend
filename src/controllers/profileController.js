const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const ong_id = request.headers.authorization;
        const ongs = await connection('incidents').select('*').where({"ong_id": ong_id});
        console.log(ongs);
        return response.json(ongs);
    }
}