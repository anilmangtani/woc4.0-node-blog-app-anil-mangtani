const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller')


route.get('/', services.homeRoutr)

route.get('/view-blog', services.view_blog)

route.get('/new-blog', services.new_blog);



//API

route.post('/api/blog', controller.create)
route.get('/api/blog', controller.find)
route.put('/api/blog/:id', controller.update)
route.delete('/api/blog/:id', controller.delete)

module.exports = route;