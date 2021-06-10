const mongoose = require('mongoose');

//Set up default mongoose connection
const URL = 'mongodb://localhost:27017/jlg_bank';

//Get the default connection
const db = mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
 

const con = mongoose.connection;

con.on('open', function() {
    console.log('Conectado ao MongoDB!');
});
con.on('error', function() {
    console.log('Erro a conexão com o MongoDB!');
});
con.on('error', function() {
    console.log('Desconctado do MongoDB!');
});

module.exports = db;