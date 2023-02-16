import mongoose from 'mongoose'
import config from './config/config'

require("dotenv").config();

mongoose.set("strictQuery", true);

mongoose.connect(config.DB.URI);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Mongodb conexion establecida');
});

connection.on('error', err => {
    console.log ('Mongodb error de conexion', err);
    process.exit();
})