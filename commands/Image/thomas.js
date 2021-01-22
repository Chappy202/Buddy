const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class TatooimgCommand extends Command {
    constructor() {
        super('thomas', {
            aliases: ['thomas'],
            category: 'Image Generation'
        });

        this.name = 'thomas'
        this.description = 'Get a image of your/someone\'s avatar on a Thomas train.'
        this.usage = 'thomas [@user]'
        this.example = 'thomas @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Thomas().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Thomas ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "thomas.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = TatooimgCommand;