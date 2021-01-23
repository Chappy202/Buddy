const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class AdImgCommand extends Command {
    constructor() {
        super('adimg', {
            aliases: ['adimg'],
            category: 'Image Generation'
        });

        this.name = 'adimg'
        this.description = 'Get a image of your/someone\'s avatar being placed on a Ad.'
        this.usage = 'adimg [@user]'
        this.example = 'adimg @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Ad().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Ad <@${message.author.id}>`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "ad.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = AdImgCommand;