const { Schema, model } = require('mongoose');

const GuildsCache = new Schema(
    {
        guilds: Map,
    },
);

module.exports = model('GuildsCache-InteractionsJS', GuildsCache);