const { Schema, model } = require('mongoose');

const UsersCache = new Schema(
    {
        users: Map,
    },
);

module.exports = model('UsersCache-InteractionsJS', UsersCache);