const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class LizardCommand extends Command {
    constructor() {
        super('lizard', {
            aliases: ['lizard'],
            category: 'Fun'
        });

        this.name = 'lizard'
        this.description = 'Get a random image of a lizard/lizards'
        this.usage = 'lizard'
        this.example = 'lizard'
    }

    async exec(message) {
        let media = await sfw.lizard();

        let output = this.client.util.embed()
            .setTitle(`Lizard 🦎`)
            .setImage(`${media.url}`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();

        return message.util.send(output);
    }
}

module.exports = LizardCommand;