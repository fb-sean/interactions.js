const mongoose = require('mongoose');

async function init(c) {
    c.emit('connectionToDatabase', c);

    mongoose.connect(c.mongooseString)
        .then(e => {
            c.emit('debug', "[DEBUG] Connected to Mongoose");
            c.emit('databaseConnected', c);
        })
        .catch(e => {
            c.emit('debug', "[DEBUG] Got a error by trying to connect to mongoose");
            c.emit('databaseError', c, e.message);
        });

    mongoose.Promise = global.Promise;

    mongoose.connection.on('err', err => {
        c.emit('debug', "[DEBUG] Got a error from the database");
        c.emit('databaseError', c, err);
    });

    mongoose.connection.on('disconnected', () => {
        c.emit('debug', "[DEBUG] Got a database disconnection");
        c.emit('databaseDisconnected', c);
    });
}

module.exports = init;