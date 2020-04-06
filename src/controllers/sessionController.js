const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {id} = request.body;
        const ongs = await connection('ongs').select('name').where({"id": id}).first();
        
        return !ongs? response.status(400).json({error: 'No ONG founded'}):response.json(ongs);
    }
}