const { Schema, model } = require('mongoose');

const ChannelsCache = new Schema(
    {
        channels: Map,
    },
);

module.exports = model('ChannelsCache-InteractionsJS', ChannelsCache);