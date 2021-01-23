const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class DiscordBlackCommand extends Command {
    constructor() {
        super('discordblack', {
            aliases: ['discordblack'],
            category: 'Image Generation'
        });

        this.name = 'discordblack'
        this.description = 'Get a image of your/someone\'s avatar behind Discord Black logo.'
        this.usage = 'discordblack [@user]'
        this.example = 'discordblack @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Beautiful().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Discordblack <@${message.author.id}>`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "discordblack.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = DiscordBlackCommand;