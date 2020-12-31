const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class FactCommand extends Command {
    constructor() {
        super('fact', {
            aliases: ['fact'],
            category: 'Fun'
        });

        this.name = 'fact'
        this.description = 'Get a random fact'
        this.usage = 'fact'
        this.example = 'fact'
    }

    async exec(message) {
        let text = await sfw.fact();
        //console.log(text)
        let output = this.client.util.embed()
            .setTitle(`Random Fact`)
            .setDescription(`${this.client.util.capatalizeFirst(text.fact)}`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();

        return message.util.send(output);
    }
}

module.exports = FactCommand;