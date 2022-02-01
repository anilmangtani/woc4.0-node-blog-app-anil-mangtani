const { default: axios } = require('axios');
let Userdb = require('../model/model')
let UserSchema = require('../model/usermodel')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//create and save new blog
exports.create =(req,res)=>{
    //validate req
    if(!req.body){
        res.status(400).send({message:"content not be empty"});
        return;
    }

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    
    if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }


    let blog = new Userdb({
        title:req.body.title,
        description: req.body.description,
        image : newImageName
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

    if(!req.body){
        return res
        .status(400)
        .send({message:err.message || "Some Error Occured! try again"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`can not find user with ${id} `})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Some Error Occured! try again"});

    })

}

//delete the blog
exports.delete = (req,res)=>{

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`can not delete user with ${id} `})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Some Error Occured! try again"});
    
        })

}





//create and save new user
exports.signup =(req,res,next)=>{
    //validate req
    if(!req.body){
        res.status(400).send({message:"content not be empty"});
        return;
    }

    bcrypt.hash(req.body.password, 10, function(err,hash){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new UserSchema({
            firstname:req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
        })
    
        user
            .save(user)
            .then(data=>{
                //res.send(data)
                res.redirect('/login')
            })
            .catch(err=>{
                res.status(500).send({
                    message: err.message || "Some Error Occured! try again"
                });
            });
    })

   
}


exports.loginuser = (req,res,next) => {
    let username = req.body.username
    let password = req.body.password

    UserSchema.findOne({email:username})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }

                if(result){
                    let token = jwt.sign({firstname:user.firstname},'secvalue',{expiresIn:'1h'})
                    res.redirect('/')
                }else{
                    res.json({
                        message:'Password does not matched'
                    })
                }
            })
        }
    })
}

