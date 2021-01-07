const path = require('path');
const {
    AkairoClient,
    CommandHandler,
    ListenerHandler
} = require('discord-akairo');
const { ownerID, defaultPrefix } = require('../config.js');
const config = require('../config.js');
const BuddyClientUtil = require('./BuddyClientUtil.js');
const db = require('quick.db');
const winston = require('winston');
const utils = require('./utils.js');
const { Player } = require('discord-player');
const { GiveawaysManager } = require('discord-giveaways');

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
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' })
            ],
            format: winston.format.printf(
                log => `[${utils.getToday()}][${log.level.toUpperCase()}] ${log.message}`
            )
        });

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

        this.giveaway = new GiveawaysManager(this, {
            storage: path.join(__dirname, '..', 'assets/json/giveaways.JSON'),
            updateCountdownEvery: 10000,
            hasGuildMembersIntent: false,
            default: {
                botsCanWin: false,
                exemptPermissions: ['ADMINISTRATOR'],
                embedColor: process.env.BASECOLOR,
                reaction: '🎉'
            }
        });

        this.player = new Player(this, {
            leaveOnEnd: true,
            leaveOnEndCooldown: 5000,
            leaveOnStop: true,
            leaveOnEmpty: true,
            leaveOnEmptyCooldown: 2000,
            autoSelfDeaf: true
        });

        this.util = new BuddyClientUtil(this);

        this.config = config;
        this.db = db;

        /*this.player = new Player(this, {
            leaveOnEnd: false,
            leaveOnStop: true,
            leaveOnEmpty: false,
            timeout: 5000,
            quality: 'high',
        });*/

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            musicHandler: this.player,
            process: process
        });
    }

    async login(token){
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();

        /*this.manager
            .on('ready', node => console.log(`Node "${node.id}" is ready!`))
            .on('disconnect', (ws, node) =>
                console.log(`Node "${node.id}" is trying to reconnect...`)
            )
            .on('error', (error, node) =>
                console.log(`Node "${node.id}" ran into an error: ${error.message}`)
            );*/

        return super.login(token);
    }
}