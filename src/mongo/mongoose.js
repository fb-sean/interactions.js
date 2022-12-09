const mongoose = require('mongoose');
const Application = require("../application/base");


async function init(c) {
    this.client.emit('connectionToDatabase', c);

    mongoose.connect(this.client.mongooseString)
        .then(async e => {
            this.client.emit('debug', "[DEBUG] Connected to Mongoose");

            /**
             * Emitted the database connected event.
             * @event Application#databaseConnected
             * @param {Application} client The bot client
             */
            this.client.emit('databaseConnected', c);

            if(c?.useMongooseCache) await c._cache.loadCache();
        })
        .catch(e => {
            this.client.emit('debug', "[DEBUG] Got a error by trying to connect to mongoose");

            /**
             * Emitted the database error event.
             * @event Application#databaseError
             * @param {Application} client The bot client
             * @param {err} err The error message
             */
            this.client.emit('databaseError', c, e.message);
        });

    mongoose.Promise = global.Promise;

    mongoose.connection.on('err', err => {
        this.client.emit('debug', "[DEBUG] Got a error from the database", err);

        /**
         * Emitted the database error event.
         * @event Application#databaseError
         * @param {Application} client The bot client
         * @param {err} err The error message
         */
        this.client.emit('databaseError', c, err);
    });

    mongoose.connection.on('disconnected', () => {
        this.client.emit('debug', "[DEBUG] Got a database disconnection");

        /**
         * Emitted the database disconnected event.
         * @event Application#databaseDisconnected
         * @param {Application} client The bot client
         */
        this.client.emit('databaseDisconnected', c);
    });
}

module.exports = init;
