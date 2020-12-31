const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { NekoBot } = require('nekobot-api');
const nsfw = new NekoBot();

class ThighNSFWCommand extends Command {
    constructor() {
        super('thigh', {
            aliases: ['thigh'],
            category: 'NSFW'
        });
        this.name = "thigh"
        this.description = "Get a random thigh image/gif"
        this.usage = "thigh"
        this.example = "thigh"
    }

    async exec(message) {
        if (!message.channel.nsfw) {
            return message.util.send(this.client.util.noNSFW(message));
        }
        const image = await nsfw.get("thigh");
        const output = new MessageEmbed()
            .setColor('#eb6449')
            .setTitle(`NSFW Thigh`)
            .setImage(`${image}`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();

        return message.util.send(output);
    }
}

module.exports = ThighNSFWCommand;