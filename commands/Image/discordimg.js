const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class DiscordImgCommand extends Command {
    constructor() {
        super('discordimg', {
            aliases: ['discordimg'],
            category: 'Image Generation'
        });

        this.name = 'discordimg'
        this.description = 'Get a image of your/someone\'s avatar behind Discord\'s logo.'
        this.usage = 'discordimg [@user]'
        this.example = 'discordimg @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.DiscordBlue().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Discord <@${message.author.id}>`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "discord.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = DiscordImgCommand;