const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class SmugCommand extends Command {
    constructor() {
        super('smug', {
            aliases: ['smug'],
            category: 'Fun'
        });

        this.name = 'smug'
        this.description = 'Show-off your smugness'
        this.usage = 'smug'
        this.example = 'smug'
    }

    async exec(message) {
        let media = await sfw.smug();

        let output = this.client.util.embed()
            .setTitle(`${message.author.tag} is feeling smug`)
            .setImage(`${media.url}`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();

        return message.util.send(output);
    }
}

module.exports = SmugCommand;