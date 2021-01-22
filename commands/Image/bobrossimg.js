const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class BobRossImgCommand extends Command {
    constructor() {
        super('bobrossimg', {
            aliases: ['bobrossimg'],
            category: 'Image Generation'
        });

        this.name = 'bobrossimg'
        this.description = 'Get a image of your/someone\'s avatar being painted by bobross.'
        this.usage = 'bobrossimg [@user]'
        this.example = 'bobrossimg @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Bobross().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`BobRoss painting ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "bobross.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = BobRossImgCommand;