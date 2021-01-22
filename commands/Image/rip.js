const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class RIPimgCommand extends Command {
    constructor() {
        super('rip', {
            aliases: ['rip'],
            category: 'Image Generation'
        });

        this.name = 'rip'
        this.description = 'Get a image of your/someone\'s avatar on a RIP image.'
        this.usage = 'rip [@user]'
        this.example = 'rip @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Rip().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`RIP ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "rip.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = RIPimgCommand;