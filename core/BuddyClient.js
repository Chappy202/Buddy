const path = require('path');
const {
    AkairoClient,
    CommandHandler,
    ListenerHandler
} = require('discord-akairo');
const { ownerID, defaultPrefix } = require('../config.js');
const config = require('../config.js');
const { Manager } = require('@lavacord/discord.js');
const BuddyClientUtil = require('./BuddyClientUtil.js');
const db = require('quick.db');
const winston = require('winston');
const utils = require('./utils.js');

require('../structures/Guild.js');
require('../structures/GuildMember.js');
require('../structures/Message.js');

module.exports = class BuddyClient extends AkairoClient{
    constructor() {
        super({
            ownerID
        },{
            disableEveryone: true,
            disableMentions: 'everyone'
        });

        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'log' })
            ],
            format: winston.format.printf(
                log => `[${utils.getToday()}][${log.level.toUpperCase()}] ${log.message}`
            )
        });

        this.manager = new Manager(this, [
            {
                id: 'main',
                host: process.env.LAVA_HOST,
                port: process.env.LAVA_PORT,
                password: process.env.LAVA_PASS
            }
        ]);

        this.commandHandler = new CommandHandler(this, {
            directory: path.join(__dirname, '..', 'commands/'),
            handleEdits: true,
            storeMessages: true,
            commandUtil: true,
            allowMention: true,
            blockBots: true,
            blockClient: true,
            defaultCooldown: 2000,
            prefix: message => (message.guild ? message.guild.prefix : defaultPrefix)
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: path.join(__dirname, '..', 'listeners/')
        });

        this.util = new BuddyClientUtil(this);
        this.config = config;
        this.db = db;
    }

    async login(token){
        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();

        this.manager
            .on('ready', node => console.log(`Node "${node.id}" is ready!`))
            .on('disconnect', (ws, node) =>
                console.log(`Node "${node.id}" is trying to reconnect...`)
            )
            .on('error', (error, node) =>
                console.log(`Node "${node.id}" ran into an error: ${error.message}`)
            );

        return super.login(token);
    }
}