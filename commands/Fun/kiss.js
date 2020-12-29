const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const axios = require('axios');

class KissCommand extends Command {
    constructor() {
        super('kiss', {
            aliases: ['kiss']
        });

        this.name = "kiss"
        this.description = "Kiss someone"
        this.usage = "kiss <@user>"
        this.example = "kiss @Chappy#3353"
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user) return message.util.send(new Discord.MessageEmbed().setTitle("Couln't find user").setColor('#f26666').setDescription(`Make sure to tag someone!`).setTimestamp());
        if (message.author.id === user.id) return message.util.send(new Discord.MessageEmbed().setTitle("Kiss 💋").setColor('#e879d5').setDescription(`Love yourself ❤`).setTimestamp());

        let embed = new Discord.MessageEmbed()
            .setColor('#e879d5')
            .setDescription(`Kissing 💋...`)
            .setTimestamp(Date());

        const m = await message.util.send(embed);

        const kiss = await axios.get('https://nekos.life/api/kiss');

        embed = new Discord.MessageEmbed()
            .setTitle("Kiss 💋")
            .setColor('#e879d5')
            .setDescription(`Uwu ${message.author.tag} kissed ${user.tag}`)
            .setImage(kiss.data.url)
            .setTimestamp(Date())

        return message.util.send(embed)
    }
}

module.exports = KissCommand;