const { Command } = require('discord-akairo');

class TestCommand extends Command {
    constructor() {
        super('test', {
            aliases: ['test', 'floopse'],
            ownerOnly: true,
            category: 'Developer'
        });
        this.description = "Updates the bot and all modules"
        this.usage = 'test'
        this.example = 'test'
        this.name = "test"
    }

    async exec(message) {
        console.log(message.content.substring(1));
    }

}

module.exports = TestCommand;