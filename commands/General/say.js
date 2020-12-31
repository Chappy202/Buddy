const { Command } = require('discord-akairo');

class SayCommand extends Command {
    constructor() {
        super('say', {
            aliases: ['say', 'tell'],
            category: 'General',
            channel: 'guild',
            args: [
                {
                    id: 'thing',
                    type: 'string',
                    match: 'content'
                }
            ],
        });
        this.name = "say"
        this.description = "Make Buddy say something"
        this.usage = "say"
        this.example = "say"
    }

    async exec(message, { thing }) {
        message.channel.send(thing);
        message.delete();
    }
}

module.exports = SayCommand;