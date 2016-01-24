'use strict';

var express = require('express');
var path = require('path');
var routes = require('./app/routes/index.js');
var api = require('./app/api/img-sal.js');
require('dotenv').config({
  silent: true
});

var db = require('./app/api/database.js');

var app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  routes(app);
  api(app,db);

  var port = process.env.PORT || 8080;
  app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
  });



/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {*/

  

  // The format follows as, alias to use for real path, also allows permission to such path.


  
/*  
});*/