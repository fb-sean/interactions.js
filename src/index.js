'use strict';

// Main Application
exports.Application = require("./application/base.js");

// Embed
exports.Embed = require("./structures/Embed.js");

// Managers
exports.ChannelManager = require("./structures/managers/ChannelManager.js");
exports.UserManager = require("./structures/managers/UserManager.js");
exports.Rest = require("./structures/Rest.js");

// Message Components
exports.Button = require("./structures/Button.js");
exports.SelectMenu = require("./structures/SelectMenu.js");
exports.ActionRow = require("./structures/ActionRow.js");
exports.SelectMenuOption = require("./structures/SelectMenuOption.js");

// Message Components Utils
exports.ButtonStyles = require("./structures/ButtonStyles.js");
exports.SelectMenuTypes = require("./structures/SelectMenuTypes.js");

// Modal
exports.Modal = require("./structures/Modal.js");
exports.TextInput = require("./structures/TextInput.js");
exports.TextInputStyles = require("./structures/TextInputStyles.js");

// Utils
exports.Colors = require("./structures/Colors.js");
exports.Utils = require("./utils/Utils.js");
exports.version = require("../package.json").version;
