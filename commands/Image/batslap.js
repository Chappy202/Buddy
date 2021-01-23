const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class BatslapCommand extends Command {
    constructor() {
        super('batslap', {
            aliases: ['batslap'],
            category: 'Image Generation'
        });

        this.name = 'batslap'
        this.description = 'Batslap someone.'
        this.usage = 'batslap <@user>'
        this.example = 'batslap @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        console.log(user)
        if (!user) return message.util.send(new Discord.MessageEmbed().setTitle("Couln't find user").setColor('#f26666').setDescription(`Make sure to tag someone!`).setTimestamp());
        if (message.author.id === user.id) return message.util.send(new Discord.MessageEmbed().setTitle("Oops").setColor('#f26666').setDescription(`You can't slap yourself!`).setTimestamp());
        let avatar = user.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Batslap().getImage(avatar, message.author.avatarURL({ dynamic: false, format: 'png' }));
        let embed = this.client.util.embed()
            .setAuthor(`<@${message.author.id}> Batslaps <@${user.id}>`, message.author.avatarURL())
            .setFooter(`Req by: ${message.author.tag}`)
            .setTimestamp();
        message.util.send(embed);
        let m = await message.util.sendNew('Loading...');
        let attach = new Discord.MessageAttachment(img, "batslap.png");
        await message.util.sendNew(attach);
        return m.delete();
    }
}

module.exports = BatslapCommand;