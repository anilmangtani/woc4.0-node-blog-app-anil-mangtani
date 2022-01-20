const axios = require('axios');


exports.homeRoutr = (req,res) =>{
    
    axios.get('http://localhost:3000/api/blog')
        .then(function(response){
            console.log(response.data);
            res.render('home',{ blog: response.data});    
        })
        .catch(err=>{
            res.send(err)
        })
}

exports.new_blog = (req,res)=>{
    res.render('new_blog');
}

exports.view_blog = (req,res)=>{
    axios.get('http://localhost:3000/api/blog',{params:{id:req.query.id}})    
    .then(function(userdata){
        res.render("view_blog",{user:userdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
}

