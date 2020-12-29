require('dotenv').config();

const { CommandHandler } = require("discord-akairo");
const { prefix } = require("./config.js");
const path = require("path");

const BuddyClient = require('./core/BuddyClient');
const BuddyClientUtil = require('./core/BuddyClientUtil');
const express = require("express");
const app = express();
const client = new BuddyClient({
    fetchAllMembers: true
});
client.util = new BuddyClientUtil();

app.get("/", (req, res) => {
    res.send("Ready!")
})

app.listen(process.env.PORT)
client.login(process.env.TOKEN);