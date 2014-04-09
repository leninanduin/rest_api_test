var express = require('express'),
    path = require('path'),
    http = require('http'),
    user = require('./routes/users');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});
 
app.get('/user/list', user.findAll);
app.get('/user/get/:id', user.findById);
app.post('/user/add', user.addUser);
app.put('/user/edit', user.updateUser);
app.post('/user/delete', user.deleteUser);
app.post('/user/login', user.loginUser);
app.get('/user/logout/:email', user.logoutUser);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
