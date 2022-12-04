const { Application } = require("../src/index.js");

const Client = new Application({
    botToken: "X", // Bot token
    publicKey: "X", // The public key of your bot
    applicationId: "X", // The client application ID
    port: 8221, // Your favorite port
});

Client.start().then(() => {
    console.log("Client Started");
});

Client.on("debug", debug => console.log(debug));

// Setting Commands
//
// Client.setAppCommands([
//     {
//         name: "ping",
//         description: "Pong!",
//     },
// ]).catch(console.log);

Client.on("interactionCreate", (i) => {
    console.log(i.reply({
        content: "Pong!",
        ephemeral: true,
    }));

    if (i.commandName === "ping") {
        return i.reply({
            content: "Pong!",
            ephemeral: true,
        });
    }
});