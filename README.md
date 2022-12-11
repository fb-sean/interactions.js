## About

interactions.js is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with [Discord](https://discord.com/developers/docs/intro) interactions.

- Object-oriented
- Performant
- Inbuilt Cache
- Easy to use

## Installation

**Node.js 16.9.0 or newer is required.**

```sh-session
npm i interactions.js
```

## Example Application

```js
const { Application } = require("interactions.js");
require('dotenv').config()

const Client = new Application({
    botToken: process.env.TOKEN, // Your Bot Token
    publicKey: process.env.PUBLICKEY, // The Application Public Key
    applicationId: process.env.APPLICATIONID, // The Application ID
    port: 8221, // Your Port (Default: 1337)
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
```

## Help

If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle
nudge in the right direction, please don't hesitate to join our [discord server](https://discord.gg/ZVERh35).

## Example Handler
- [http-bot-template](https://github.com/mezotv/http-bot-template)

## Bots Using interactions.js
- [Himiko](https://discord.com/api/oauth2/authorize?client_id=1008142696801648711&permissions=2147797056&scope=bot%20applications.commands)
- [Imagine](https://discord.com/api/oauth2/authorize?client_id=1039996075882336336&permissions=313344&scope=applications.commands%20bot)
- [Memer](https://discord.com/api/oauth2/authorize?client_id=927598798019108894&permissions=2147863616&scope=bot%20applications.commands)
- [TindCord](https://discord.com/api/oauth2/authorize?client_id=935185892719603713&permissions=137439332416&scope=bot%20applications.commands)
- [Crypto Helper](https://discord.com/api/oauth2/authorize?client_id=747050613656911892&permissions=0&scope=applications.commands%20bot)
- your bot? [Join our discord server](https://discord.gg/ZVERh35) and let us know!
