const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class WhyCommand extends Command {
    constructor() {
        super('why', {
            aliases: ['why'],
            category: 'Fun'
        });

        this.name = 'why'
        this.description = 'Get a random question'
        this.usage = 'why'
        this.example = 'why'
    }

    async exec(message) {
        let text = await sfw.why();
        //console.log(text)
        let output = this.client.util.embed()
            .setTitle(`Random Question`)
            .setDescription(`${this.client.util.capatalizeFirst(text.why)}`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();

        return message.util.send(output);
    }
}

module.exports = WhyCommand;