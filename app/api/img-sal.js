'use strict';
var request = require('request');
module.exports = function(app, db) {

  app.route('/latest')
    // Retrieve most recent searches
    .get(handleGet);

  app.get('/:query', handlePost);

  function handleGet (req, res, db) {
      // Get and display latest searches
      getHistory(db, res);
  }
  
  function handlePost (req, res, db) {
      // Get images and save query and date.
      var ip = req.headers['x-forwarded-for'] || 
                 req.connection.remoteAddress || 
                 req.socket.remoteAddress ||
                 req.connection.socket.remoteAddress;
      var query = req.params.query;
      var size = req.query;
      var url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + query + '&userip=' + ip + '&rsz=' + size.offset;
      console.log(url);
      request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              console.log(info);
              res.send(info);
              //save(info, db);
          }
      });
  }
  
  function save(obj, db) {
    // Save object into db.
    var searches = db.collection('searches');
    searches.save(obj, function(err, result) {
      if (err) throw err;
      console.log('Saved ' + result);
    });
  }
  
  function getHistory(db, res) {
    // Check to see if the site is already there
    var searches = db.collection('searches');
    // get the url
    searches.find(function(err, result) {
      if (err) throw err;
      // object of the url
      if (result) {
        // we have a result
        console.log('Found ' + result);
        res.send(result);
      } else {
        // we don't
        res.send('No history Found');
      }
    });
  }






};