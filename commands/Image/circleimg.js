const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class CircleimgCommand extends Command {
    constructor() {
        super('circle', {
            aliases: ['circle'],
            category: 'Image Generation'
        });

        this.name = 'circle'
        this.description = 'Get a circle cropped image of your current avatar.'
        this.usage = 'circle [@user]'
        this.example = 'circle @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Circle().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Circle ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "circle.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = CircleimgCommand;