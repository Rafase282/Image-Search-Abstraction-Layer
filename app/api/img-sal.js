'use strict';
module.exports = function(app, db) {

  app.route('/latest')
    // Retrieve most recent searches
    .get(handleGet);

  app.get('/:query?offset=10', handlePost);

  function handleGet (req, res, db) {
      // Get and display latest searches
      var objArr;
      res.send(objArr);
  }
  
  function handlePost (req, res, db) {
      // Get images and save query and date.
      var results;
      res.send(results);
  }






};