## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Example](#example)
    - [Example way to get the guild count](#example-way-to-get-the-guild-count)
  - [Help](#help)
  - [Example Handler](#example-handler)
  - [Bots Using interactions.js](#bots-using-interactionsjs)

## About

interactions.js is a powerful [Node.js](https://nodejs.org) module that makes it easy to create and handle [Discord](https://discord.com/developers/docs/intro) interactions. It provides a comprehensive set of features and utilities that help developers to seamlessly integrate interactions into their Discord bots and applications.

Some key features of interactions.js include:

- **Object-oriented:** Interactions are represented as classes which makes the API simple and intuitive to use.
- **Performant:** Built on top of discord.js and optimized for performance.
- **Inbuilt Cache:** Comes with an in-memory cache to store interactions for faster responses.
- **Easy to use:** Simple and intuitive API that is easy to integrate into existing bots and applications.
- **Robust:** Provides utilities for building complex interactions with features like autocomplete, modal forms etc.
- **Extensible:** Easy to extend and customize through plugins and middleware.
  
# Getting Started

## Installation

**Prerequisites:** `Node.js 16.9.0 or newer is required.`

- To install interactions.js, run the following command:

```js
npm install interactions.js

//This installs interactions.js and its dependencies using npm.
```

## Example

**Here is a basic example of how to get started with interactions.js:**

- Create an Application instance
  
```js
const { Application } = require("interactions.js");

  const Client = new Application({
    botToken: process.env.TOKEN, // Your Bot Token
    publicKey: process.env.PUBLICKEY, // The Application Public Key
    applicationId: process.env.APPLICATIONID, // The Application ID
  });
```

This creates the Application instance with the required authentication details and starts the client. It connects to Discord and initializes the interactions.js library.

- Start the client:
  
```js

  Client.start().then(() => {
     console.log("Client Started");
    });  

  Client.on("debug", debug => console.log(debug));

```

This logs any debug information from the client to the console.

- Create an Interaction Command:
  
```js

   Client.setAppCommands([{
    name: "ping",
    description: "Pong!",
        },
    ]).catch(console.log);
```

This creates a **ping** command and registers it with the client. The .catch() handles any errors from registering the command.

- Create Handle interaction events:

```js
// Handle interaction events:
Client.on("interactionCreate", async (i) => {
  if (i.commandName === "ping") {
    return i.reply({
      content: "Pong!",
      ephemeral: true,
    });
  }
});
```

<details >
<summary> <b>See Full Example Code</b></summary>

```js
    const { Application } = require("interactions.js");

    const Client = new Application({
            botToken: process.env.TOKEN, // Your Bot Token
            publicKey: process.env.PUBLICKEY, // The Application Public Key
            applicationId: process.env.APPLICATIONID, // The Application ID
        });

        /**
         * After calling start(), the api starts on port 8221 in this example and you need to set your  application's interaction url to https://your-domain.com/interactions
         * 
         * The /interactions parts is required and you can't change it.
         */

    Client.start().then(() => {
        console.log("Client Started");
        });  

    Client.on("debug", debug => console.log(debug));

    // Create an Interaction Command:
    Client.setAppCommands([{
        name: "ping",
        description: "Pong!",
            },
        ]).catch(console.log);

    // Handle interaction events:
    Client.on("interactionCreate", async (i) => {
    if (i.commandName === "ping") {
        return i.reply({
        content: "Pong!",
        ephemeral: true,
        });
    }
    });

    //Once you have followed these steps, you will be able to start receiving and handling interactions from your Discord bot.

```

</details>

see above code for details on setting up interactions.js client and registering commands

### Example way to get the guild count
  
```js

const { UserManager } = require("interactions.js");
const application = await UserManager.fetchMyApplication();

// Note: This is not the actual guild count, but an approximation
const guildCount = application.approximate_guild_count;

```

## Help

If you have questions, encounter issues, or need guidance, feel free to join our [Discord server](https://discord.gg/ZVERh35). We have an active community of developers happy to help!

## Example Handler

Check out [http-bot-template](https://github.com/mezotv/http-bot-template) for an example of how to use interactions.js in a bot project.

## Bots Using interactions.js

Some notable bots that use interactions.js include:

- [Himiko](https://discord.com/api/oauth2/authorize?client_id=1008142696801648711&permissions=2147797056&scope=bot%20applications.commands)
- [Imagine](https://discord.com/api/oauth2/authorize?client_id=1039996075882336336&permissions=313344&scope=applications.commands%20bot)
- [Memer](https://discord.com/api/oauth2/authorize?client_id=927598798019108894&permissions=2147863616&scope=bot%20applications.commands)
- [TindCord](https://discord.com/api/oauth2/authorize?client_id=935185892719603713&permissions=137439332416&scope=bot%20applications.commands)
- [Crypto Helper](https://discord.com/api/oauth2/authorize?client_id=747050613656911892&permissions=0&scope=applications.commands%20bot)
- Your bot? Join our Discord server and let us know! We'd be happy to feature your bot.
