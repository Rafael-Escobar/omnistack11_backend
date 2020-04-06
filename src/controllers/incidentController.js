const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        console.log(request.body);
        const [id]= await connection('incidents').insert(
            {
                title,
                description,
                value,
                ong_id
            }
        );
        return response.json({ id });
    },
    async list(request, response)  {
        const {page =1 }= request.query;
        const [count] = await connection('incidents').count('*');
        const ongs = await connection('incidents')
            .join("ongs", "ongs.id","=","incidents.ong_id")
            .limit(5)
            .offset((page-1)*5)
            .select(['incidents.*',
                'ongs.name',
                'ongs.name',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        console.log(ongs);
        response.header("X-Total_count",count['count(*)']);
        return response.json(ongs);
    },
    async listByOng(request, response) {
        // const ong_id = request.headers.authorization;
        const ong_id = request.params.ong_id;
        const ongs = await connection('incidents').select('*').where({"ong_id": ong_id});
        console.log(ongs);
        return response.json(ongs);
    },
    async delete(request, response) {
        const id = request.params.id;
        const ong_id = request.headers.authorization;
        const result = await connection('incidents').where({ "id": id, "ong_id": ong_id}).delete();
        return result ? response.status(204).send() : response.status(404).json({error:'Operation not permitted.'});
    }
}