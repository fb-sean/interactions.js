const { Application, ChannelManager } = require("../src/index.js");
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
    if (i.commandName === "ping") {
        return i.reply({
            content: "Pong!",
            ephemeral: true,
        });
    }
});
