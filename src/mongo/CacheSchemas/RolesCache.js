const { Schema, model } = require('mongoose');

const RolesCache = new Schema(
    {
        roles: Map,
    },
);

module.exports = model('RolesCache-InteractionsJS', RolesCache);