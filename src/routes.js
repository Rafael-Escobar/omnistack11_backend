const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
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

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().max(11).min(10),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ongController.create);
/*
*   Métodos relacionados a ONG
*/
routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object({
        id: Joi.string().required()
    })
}), sessionController.create);
/*
*   Métodos relacionados a incident
*/
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), incidentController.create );

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object({
        page: Joi.number()
    })
}), incidentController.list);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().required()
    })
}), incidentController.delete);
/*
*   Métodos relacionados a incident
*/
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), profileController.list);

module.exports = routes;