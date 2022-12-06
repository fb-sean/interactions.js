const { Schema, model } = require('mongoose');

const MembersCache = new Schema(
    {
        members: Map,
    },
);

module.exports = model('MembersCache-InteractionsJS', MembersCache);