const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class ConfusedstonksCommand extends Command {
    constructor() {
        super('confusedstonks', {
            aliases: ['confusedstonks'],
            category: 'Image Generation'
        });

        this.name = 'confusedstonks'
        this.description = 'Get a image of your/someone\'s avatar on confusedstonks.'
        this.usage = 'confusedstonks [@user]'
        this.example = 'confusedstonks @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.ConfusedStonk().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Confusedstonks ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "confusedstonks.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = ConfusedstonksCommand;