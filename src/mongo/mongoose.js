const mongoose = require('mongoose');

async function init(c) {
    this.client.emit('connectionToDatabase', c);

    mongoose.connect(this.client.mongooseString)
        .then(async e => {
            this.client.emit('debug', "[DEBUG] Connected to Mongoose");
            this.client.emit('databaseConnected', c);

            if(c?.useMongooseCache) await c._cache.loadCache();
        })
        .catch(e => {
            this.client.emit('debug', "[DEBUG] Got a error by trying to connect to mongoose");
            this.client.emit('databaseError', c, e.message);
        });

    mongoose.Promise = global.Promise;

    mongoose.connection.on('err', err => {
        this.client.emit('debug', "[DEBUG] Got a error from the database", err);
        this.client.emit('databaseError', c, err);
    });

    mongoose.connection.on('disconnected', () => {
        this.client.emit('debug', "[DEBUG] Got a database disconnection");
        this.client.emit('databaseDisconnected', c);
    });
}

module.exports = init;