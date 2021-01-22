const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class FacepalmCommand extends Command {
    constructor() {
        super('facepalm', {
            aliases: ['facepalm'],
            category: 'Image Generation'
        });

        this.name = 'facepalm'
        this.description = 'Facepalm.'
        this.usage = 'facepalm'
        this.example = 'facepalm'
    }

    async exec(message) {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Facepalm().getImage(avatar);
        let embed = this.client.util.embed()
            .setAuthor(`Facepalm ${message.author.tag}`, message.author.avatarURL())
            .setFooter(`Req by: ${message.author.tag}`)
            .setTimestamp();
        message.util.send(embed);
        let m = await message.util.sendNew('Loading...');
        let attach = new Discord.MessageAttachment(img, "facepalm.png");
        await message.util.sendNew(attach);
        return m.delete();
    }
}

module.exports = FacepalmCommand;