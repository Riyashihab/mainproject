const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true , useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', (error) => {
  console.log('Error connecting to MongoDB', error);
});

connection.once('open', () => {
  console.log('Connected to MongoDB');
});
const Schema =   mongoose.Schema;

const BookSchema = new Schema({
    title : String,
    author : String,
    genre : String,
    image : String,
    
   
});

var Bookdata = mongoose.model('bookdata',BookSchema);
console.log(Bookdata);
module.exports = Bookdata;
