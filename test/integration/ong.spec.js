const request = require('supertest');
const app = require('../../src/app');
const connection = require("../../src/database/connection");
describe('ONG', ()=>{

    var idONG='';

    beforeAll( async()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async()=>{
        await connection.destroy();
    });

    it("Shoud be able to create a new ong", async ()=>{
        const response = await request(app)
            .post('/ongs')
            .send(
                {
                    name: "APAD",
                    email: "apad@gmail.com",
                    whatsapp: "47999999999",
                    city: "Rio do Sul",
                    uf: "SC"
                }
            );
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        idONG = response.body.id;
    });

    it("Shoud be able to get the ongs that are register", async () => {
        const response = await request(app)
            .get('/ongs');
        expect(response.body.length).toBeGreaterThanOrEqual(0);
    });


    it("Shoud be able to create a new incidente for the ong", async () => {
        const response = await request(app)
            .post('/incidents')
            .set("Authorization", idONG)
            .send(
                {
                    title: "Cachorro afogado",
                    description: "salvar cachorro",
                    value: 21.35
                }
            );
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBeGreaterThanOrEqual(0);
    });

    it("Shoud be able to get all the incidents that are register", async () => {
        const response = await request(app)
            .get('/incidents');
        expect(response.body.length).toBeGreaterThanOrEqual(0);
    });

    it("Shoudnt be able to create a session for the ong", async () => {
        const response = await request(app)
            .post('/session')
            .send(
                {
                    id: idONG
                }
            );
        console.log(response.body);
        expect(response.body).toHaveProperty('name');
    });

    it("Shoud be able to get all the incidents for an ong", async () => {
        const response = await request(app)
            .get('/profile')
            .set("Authorization", idONG);
        expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
})