const {
    Embed,
    Application,
    ChannelManager,
    ActionRow,
    SelectMenu,
    SelectMenuTypes,
    SelectMenuOption,
    Modal,
    TextInput,
    TextInputStyles,
    UserManager
} = require("../src"); // require("interactions.js");

require('dotenv').config()

const Client = new Application({
    botToken: process.env.TOKEN,
    publicKey: process.env.PUBLICKEY,
    applicationId: process.env.APPLICATIONID,
    port: 8221,
    fetchClient: true,
});

Client.start().then(() => {
    console.log("Client Started");
});

Client.on("debug", debug => console.log(debug));

// Client.setAppCommands([
//     {
//         name: "select",
//         description: "Send a select menu",
//     },
//     {
//         name: "modal",
//         description: "Send a modal!",
//     },
//     {
//         name: "embed",
//         description: "Send an embed!",
//     }
// ]).catch(console.log);

Client.on("ready", () => {

});

Client.on("interactionCreate", async (i) => {
    if (i.isCommand()) {

        // Handle a command interaction
        if (i.commandName === "modal") {
            const modal = new Modal()
                .setCustomId("test")
                .setTitle("Test Modal")
                .addComponent(
                    new ActionRow()
                        .addComponent(
                            new TextInput()
                                .setCustomId("test")
                                .setPlaceholder("test")
                                .setStyle(TextInputStyles.Short)
                                .setLabel("test")
                        )
                );

            return i.showModal(modal);
        } else if (i.commandName === "select") {
            i.deferReply(true);

            const test = await i.editReply({
                content: "Pong!",
                embeds: [
                    new Embed().setTitle('Ping')
                ],
                components: [
                    new ActionRow()
                        .addComponent(
                            new SelectMenu()
                                .setType(SelectMenuTypes.Channels)
                                .setCustomId('click_to_function')
                                .setPlaceholder('Nothing selected')
                        )
                ]
            });
        } else if (i.commandName === "embed") {
            await i.reply({
                embeds: [
                    new Embed()
                        .setTitle("Test Embed")
                        .setDescription("This is a test embed")
                        .setURL("https://interactionsjs.com/interactions.js/1.2.0")
                        .setAuthor("Interactions.js", "https://interactionsjs.com/interactions.js/1.2.0/assets/logo.png", "https://interactionsjs.com/interactions.js/1.2.0")
                        .setColor("#00FF00")
                        .setFooter("Interactions.js", "https://interactionsjs.com/interactions.js/1.2.0/assets/logo.png")
                ]
            });
        }

    } else if (i.isComponent()) {

        // Handle a component interaction
        if (i.customId === "click_to_function") {
            i.reply({
                embeds: [
                    new Embed().setTitle('Select Menu Clicked!').setDescription(`Selected Channel: ${i.values.map(ch => `<#${ch}>`).join(", ")}`)
                ],
                ephemeral: true
            });
        }

    } else if (i.isModal()) {

        // Handle a modal interaction
        i.reply({
            embeds: [
                new Embed().setTitle('Modal Submitted!').setDescription(`Your Input: ${i.components.getDataById("test").value}`)
            ],
        });

    }
});
