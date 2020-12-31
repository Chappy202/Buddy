const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class BakaCommand extends Command {
    constructor() {
        super('baka', {
            aliases: ['baka'],
            category: 'Fun'
        });

        this.name = 'baka'
        this.description = 'Idiot'
        this.usage = 'baka'
        this.example = 'baka'
    }

    async exec(message) {
        let media = await sfw.baka();

        let output = this.client.util.embed()
            .setTitle(`Idiot`)
            .setImage(`${media.url}`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();

        return message.util.send(output);
    }
}

module.exports = BakaCommand;