const express = require("express");
//var bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
var cors = require('cors')



/*----------------------------------------------------------------------*/
var app= express();
app.use(cors('*'));

 app.use(express.static('public'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));
/*----------------------------------------------------------------------*/

mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser : true},{useUnifiedTopology: true},{useCreateIndex: true});
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var Schema = new mongoose.Schema({
	name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true
    },
	phone: {
        type: String,
        required: true
    },
  });

const details = mongoose.model('details', Schema);

/*----------------------------------------------------------------------*/


/*----------------------------------------------------------------------*/

app.get('/',function(req,res){
	res.set({
		'Access-control-Allow-Origin': '*'
		});
	return res.redirect('.component/register');
	}).listen(3001)

/*----------------------------------------------------------------------*/

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var password = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":password,
		"phone":phone
	}
    return db.collection('details').findOne({email: email})
        .then(user => {
            if(user) {
                return res.status(200).json({success: false, message: 'Email already exists'})
            }
            return bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data.password, salt, (err, hash) => {
                    if (err) throw err;
                    data.password = hash;
                    return db.collection('details').insertOne(data)
                    .then(() => res.status(200).json({success: true, message: "record inserted"}))
                    .catch(e => {
                        console.log(e);
                        res.status(400).json({success: false, error: e})
                    });
                })
            });

        })
})



/*----------------------------------------------------------------------*/

app.get('/sign_up',function(req, res) {
    details.find(function(err, users){
      if (!err) {
        res.send(users);
      } else {
        res.send(err);
      }
    });
  })

/*----------------------------------------------------------------------*/

app.put('/sign_up/:ObjectId',function(req,res){
  details.updateOne(
	  {_id:req.params.ObjectId},{ name:req.body.name, email:req.body.email, password:req.body.password , phone:req.body.phone},
    {overwrite:true},
    function(err){
      if(!err){
        res.send("Records Updated");
      }
    });
})

/*----------------------------------------------------------------------*/

app.delete('/sign_up',function(req, res){

	details.deleteMany(function(err){
	  if (!err){
		res.send("Users Deleted");
	  } else {
		res.send(err);
	  }
	});
  })

/*----------------------------------------------------------------------*/

app.patch('/sign_up/:ObjectId',function(req,res){
	details.updateOne(
	{_id: req.params.ObjectId},
	{$set: req.body},
	{overwrite:true},
	function(err){
	  if(!err){
		res.send("Successfully updated the required patch");
	  }
	});
  });


//   /*----------------------------------------------------------------------*/
// app.get("/home", email, async (req, res) => {
//   try{
//     const user = await details.findById(req.user.id);
//     res.json(user);
//   } catch (e) {
//     res.send({message: "Error to fetch user"});
//   }
// });
  
console.log("server listening at port 3001");