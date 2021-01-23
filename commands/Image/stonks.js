const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class StonksimgCommand extends Command {
    constructor() {
        super('stonks', {
            aliases: ['stonks'],
            category: 'Image Generation'
        });

        this.name = 'stonks'
        this.description = 'Get a image of your/someone\'s avatar on a Stonks image.'
        this.usage = 'stonks [@user]'
        this.example = 'stonks @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Stonk().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Stonks <@${message.author.id}>`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "stonks.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = StonksimgCommand;