const { Command } = require('discord-akairo');

class TTSCommand extends Command {
    constructor() {
        super('tts', {
            aliases: ['tts', 'speak'],
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
        this.name = "tts"
        this.description = "Make Buddy say something aloud"
        this.usage = "tts"
        this.example = "tts"
    }

    async exec(message, { thing }) {
        await message.channel.send(thing, {
            tts: true
        });
        await message.delete();
    }
}

module.exports = TTSCommand;