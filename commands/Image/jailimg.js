const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class JailImgCommand extends Command {
    constructor() {
        super('jailimg', {
            aliases: ['jailimg'],
            category: 'Image Generation'
        });

        this.name = 'jailimg'
        this.description = 'Put yourself, or someone else in jail.'
        this.usage = 'jailimg [@user]'
        this.example = 'jailimg @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Jail().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Jailed <@${message.author.id}>`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "jail.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = JailImgCommand;