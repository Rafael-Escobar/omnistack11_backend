const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async listOne(request, response)  {
        const id = request.params.id;
        console.log(id);
        const ongs = await connection('ongs').select('*').where({ "id": id });
        console.log(ongs);
        return response.json(ongs);
    },
    async list(request, response)  {
        const ongs = await connection('ongs').select('*');
        console.log(ongs);
        return response.json(ongs);
    },
    async create(request, response)  {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        console.log(request.body);
        await connection('ongs').insert(
            {
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            }
        );

        return response.json({'id':id});
    }

}