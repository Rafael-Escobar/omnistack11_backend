const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();
/*
*   Métodos relacionados a ONG
*/
routes.get('/ongs/:id', ongController.listOne );
routes.get('/ongs', ongController.list);
routes.post('/ongs', ongController.create);
/*
*   Métodos relacionados a ONG
*/
routes.post('/session', sessionController.create);
/*
*   Métodos relacionados a incident
*/
routes.post('/incidents', incidentController.create );
routes.get('/incidents', incidentController.list);
routes.delete('/incidents/:id', incidentController.delete);
/*
*   Métodos relacionados a incident
*/
routes.get('/profile', profileController.list);

module.exports = routes;