const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class CatCommand extends Command {
    constructor() {
        super('cat', {
            aliases: ['cat'],
            category: 'Fun'
        });

        this.name = 'cat'
        this.description = 'Get a random image of a cat/cats'
        this.usage = 'cat'
        this.example = 'cat'
    }

    async exec(message) {
        let media = await sfw.meow();

        let output = this.client.util.embed()
            .setTitle(`Cat 🐈`)
            .setImage(`${media.url}`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();

        return message.util.send(output);
    }
}

module.exports = CatCommand;