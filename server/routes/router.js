const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller')





route.get('/', services.homeRoutr)

route.get('/view-blog', services.view_blog)

route.get('/new-blog', services.new_blog);

route.get('/update-blog',services.update_blog)

//user basic routes
route.get('/login',services.login_page);
route.get('/signup',services.signup_page)



//API

route.post('/api/blog', controller.create)
route.get('/api/blog', controller.find)
route.put('/api/blog/:id', controller.update)
route.delete('/api/blog/:id', controller.delete)


//USER API
route.post('/api/user',controller.signup);
route.post('/api/login',controller.loginuser)

module.exports = route;