var mongoose = require('mongoose');
module.exports = function() {
mongoose.connect(process.env.MONGOLAB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  var historySchema = mongoose.Schema({
    "term": String,
    "when": String
  });
  var History = mongoose.model('History', historySchema);
});
};