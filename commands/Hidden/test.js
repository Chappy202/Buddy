const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');

class TestCommand extends Command {
    constructor() {
        super('test', {
            aliases: ['test']
        });
        this.name = 'test';
        this.description = 'Run a simple test command';
        this.usage = 'test';
    }

    exec(message) {
        return message.util.send(`I can send commands ${message.author.tag}`)
    }
}

module.exports = TestCommand;