'use strict';
var Search = require('bing.search');
module.exports = function(app, db) {

  app.route('/latest')
    // Retrieve most recent searches
    .get(handleGet);

  app.get('/:query', handlePost);

  function handleGet(req, res, db) {
    // Get and display latest searches
    getHistory(db, res);
  }

  function handlePost(req, res, db) {
    // Get images and save query and date.
    var query = req.params.query;
    var size = req.query.offset;
    var search = new Search(process.env.API_KEY);
    var history = {
      "term": query,
      "when": new Date().toLocaleString()
    };
    
    // Save query and time to the database
    save(history, db);
    
    // Query the image and populate results
    search.images(query, {
        top: size
      },
      function(err, results) {
        if (err) throw err;
        res.send(results.map(makeList));
      }
    );
  }

  function makeList(img) {
    // Construct object from the json result
    return {
      "url": img.url,
      "snippet": img.title,
      "thumbnail": img.thumbnail.url,
      "context": img.sourceUrl
    };
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