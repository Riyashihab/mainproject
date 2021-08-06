const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true , useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', (error) => {
  console.log('Error connecting to MongoDB', error);
});

connection.once('open', () => {
  console.log('Connected to MongoDB');
});
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name : String,
    nationality : String,
    image : String,
    details : String
});

var Authordata = mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;