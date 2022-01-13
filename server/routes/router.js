const express = require('express');
const route = express.Router();
const services = require('../services/render');

route.get('/', services.homeRoutr)

route.get('/view-blog', services.view_blog)

route.get('/new-blog', services.new_blog);

module.exports = route;