const { default: axios } = require('axios');
let Userdb = require('../model/model')

//create and save new user
exports.create =(req,res)=>{
    //validate req
    if(!req.body){
        res.status(400).send({message:"content not be empty"});
        return;
    }

    let blog = new Userdb({
        title:req.body.title,
        description: req.body.description,
        image : req.body.image
    })

    blog
        .save(blog)
        .then(data=>{
            //res.send(data)
            res.redirect('/')
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some Error Occured! try again"
            });
        });
}

//retrieve and return all blogs/singleblog
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found user with id"+id})
                }else{
                    res.send(data)
                    
                    //res.render('view_blog',{user:data})
                    //res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving user with "+id})
            })

    }else{
    Userdb.find()
    .then(blog=>{
        res.send(blog)
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Some Error Occured! try again"})
    })

}
}

//update a new identified by blog id
exports.update = (req,res)=>{

}

//delete the blog
exports.delete = (req,res)=>{


}