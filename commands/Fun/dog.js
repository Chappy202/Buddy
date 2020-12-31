const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class DogCommand extends Command {
    constructor() {
        super('dog', {
            aliases: ['dog'],
            category: 'Fun'
        });

        this.name = 'dog'
        this.description = 'Get a random image of a dog/dogs'
        this.usage = 'dog'
        this.example = 'dog'
    }

    async exec(message) {
        let media = await sfw.woof();

        let output = this.client.util.embed()
            .setTitle(`Dog 🐕`)
            .setImage(`${media.url}`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();

        return message.util.send(output);
    }
}

module.exports = DogCommand;