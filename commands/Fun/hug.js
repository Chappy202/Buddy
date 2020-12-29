const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const axios = require('axios');

class HugCommand extends Command {
    constructor() {
        super('hug', {
            aliases: ['hug']
        });

        this.name = 'hug'
        this.description = 'Hug someone'
        this.usage = 'hug <@user>'
        this.example = 'Hug @Chappy#3353'
    }

    async exec(message){
        let user = message.mentions.users.first();
        if (!user) return message.util.send(new Discord.MessageEmbed().setTitle("Couln't find user").setColor('#f26666').setDescription(`Make sure to tag someone!`).setTimestamp());
        if (message.author.id === user.id) return message.util.send(new Discord.MessageEmbed().setTitle("Hug ❤").setColor('#e879d5').setDescription(`Hug yourself ❤`).setTimestamp());

        let embed = new Discord.MessageEmbed()
            .setColor('#e879d5')
            .setDescription(`Hugging ❤...`)
            .setTimestamp(Date());

        const m = await message.util.send(embed);

        const hug = await axios.get('https://nekos.life/api/hug');

        //console.log(hug.data.url);
        embed = new Discord.MessageEmbed()
            .setTitle("Hug ❤")
            .setColor('#e879d5')
            .setDescription(`${message.author.tag} Hugged ${user.tag}`)
            .setImage(hug.data.url)
            .setTimestamp(Date())

        return message.util.send(embed)
    }
}

module.exports = HugCommand;