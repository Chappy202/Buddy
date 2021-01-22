const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class AffectImgCommand extends Command {
    constructor() {
        super('affectimg', {
            aliases: ['affectimg'],
            category: 'Image Generation'
        });

        this.name = 'affectimg'
        this.description = 'Get a image of your/someone\'s avatar being un-affected.'
        this.usage = 'affectimg [@user]'
        this.example = 'affectimg @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Affect().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Affect ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "affect.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = AffectImgCommand;