const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class GooseCommand extends Command {
    constructor() {
        super('goose', {
            aliases: ['goose'],
            category: 'Fun'
        });

        this.name = 'goose'
        this.description = 'Get a random image of a goose/geese'
        this.usage = 'goose'
        this.example = 'goose'
    }

    async exec(message) {
        let media = await sfw.goose();

        let output = this.client.util.embed()
            .setTitle(`Goose 🦆`)
            .setImage(`${media.url}`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();

        return message.util.send(output);
    }
}

module.exports = GooseCommand;