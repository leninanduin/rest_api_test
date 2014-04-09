var mongo = require('mongodb');
var crypto = require('crypto');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

// configure the DB 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('userdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'userdb' database");
        db.collection('users', {strict:true}, function(err, collection) {            
            if (err) {                
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

//get user by ID
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, user_db) {
            if(!user_db){
                res.send({'error':'User with id: '+id+' doesnt exists'});
            }else{
                res.send(user_db);
            }
        });
    });
};

//list all users
exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

//create user
exports.addUser = function(req, res) {
    var user = req.body;    
    user.password = crypto.createHash('md5').update(user.password).digest("hex");
    console.log('Adding user: ' + JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.findOne({ "email" : user.email }, function(err, user_db) {
            if(user_db){
                res.send({'error':'Email: '+user.email+' is already registered'});
                return false;
            }else{
                collection.insert(user, {safe:true}, function(err, result) {
                    if (err) {
                        res.send({'error':'An error has occurred'});
                    } else {
                        console.log('Success: ' + JSON.stringify(result[0]));
                        res.send(result[0]);
                    }
                });
            }
        });
        
    });
}

//update user
exports.updateUser = function(req, res) {    
    var user = req.body;
    //var id = req.params.id;
    var id = user._id;
    user.password = crypto.createHash('md5').update(user.password).digest("hex");
    delete user._id;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, user_db) {
            if(!user_db){
                res.send({'error':'User with id: '+id+' doesnt exists'});
                return false;
            }
            
        });
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
}
 
//delete user by id
exports.deleteUser = function(req, res) {
    //var id = req.params.id;
    var id = req.body._id;
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {

        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, user_db) {
            if(!user_db){
                res.send({'error':'User with id: '+id+' doesnt exists'});
            }else{
                collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
                    if (err) {
                        res.send({'error':'An error has occurred - ' + err});
                    } else {
                        console.log('' + result + ' document(s) deleted');
                        res.send('Deleting user: ' + id +', ' + result + ' user deleted');
                        //res.send(req.body);
                    }
                });
            }
        });
        
    });
}

//login user, change status in DB
exports.loginUser = function(req, res) {
    var u = req.body;
    var msg;

    db.collection('users', function(err, collection) {
        collection.findOne({ "email" : u.email }, function(err, user_db) {            

            u.password = crypto.createHash('md5').update(u.password).digest("hex");
            if( user_db ){
                if( user_db.password == u.password ){
                    user_db.logged_in = 1;                
                    
                    collection.update({'_id':new BSON.ObjectID(user_db._id)}, user_db, {safe:true}, function(err, result) {
                        if (!result) {                        
                            msg = {'error':'An error has occurred starting the session, please try again'};
                        } else {                        
                            msg = 'The user has started a session';
                        }                                        
                        res.send(msg);
                    });              

                }else{
                    res.send({'error':'Wrong email - password combination'});                
                }
            }else {
                res.send({'error':'The email is not registered'});
            }
            //res.send(user_db);
            //res.send('\n');
        });
    });
}

//logout user, change status in DB
exports.logoutUser = function(req, res) {
    var email = req.params.email;
    var msg;

   db.collection('users', function(err, collection) {
        collection.findOne({ "email" : email }, function(err, user_db) {
            
            if( user_db){
                user_db.logged_in = 0;
                
                collection.update({'_id':new BSON.ObjectID(user_db._id)}, user_db, {safe:true}, function(err, result) {
                    if (!result) {                        
                        msg = {'error':'An error has occurred closing the session, please try again'};
                    } else {                        
                        msg = 'The user has finished his session';
                    }           
                    res.send(msg);         
                });
                
            }else{
                res.send({'error': 'No user with that email'});
            }                    
        });
    });
}

// sample DB
var populateDB = function() {
 
    var users = [
    {
        nombre: "Juan",
        apellido: "Perez",
        email: "jperez@example.com",
        password: crypto.createHash('md5').update("jperez").digest("hex"),
        logged_in: 0
    },
    {
        nombre: "Luis",
        apellido: "Lopez",
        email: "llopez@example.com",
        password: crypto.createHash('md5').update("llopez").digest("hex"),
        logged_in: 0
    }];
 
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};