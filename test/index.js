const { Application, ChannelManager } = require("../src/index.js");
const {Embed} = require("../src");
require('dotenv').config()

const Client = new Application({
    botToken: process.env.TOKEN,
    publicKey: process.env.PUBLICKEY,
    applicationId: process.env.APPLICATIONID,
    port: 8221,
});

Client.start().then(() => {
    console.log("Client Started");
});

Client.on("debug", debug => console.log(debug));

Client.setAppCommands([
    {
        name: "ping",
        description: "Pong!",
    },
]).catch(console.log);

Client.on("interactionCreate", async (i) => {
    console.log("Sending...")
    i.deferReply(true);

    if (i.commandName === "ping") {
        const test =  await i.editReply({
            content: "Pong!",
            embeds: [
                new Embed().setTitle('Ping')
            ]
        });
    }
});
