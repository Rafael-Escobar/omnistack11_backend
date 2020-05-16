const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async listOne(request, response)  {
        const id = request.params.id;
        const ongs = await connection('ongs').select('*').where({ "id": id });
        return response.json(ongs);
    },
    async list(request, response)  {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    async create(request, response)  {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = generateUniqueId();
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