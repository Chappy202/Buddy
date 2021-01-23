const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class TrashimgCommand extends Command {
    constructor() {
        super('trash', {
            aliases: ['trash'],
            category: 'Image Generation'
        });

        this.name = 'trash'
        this.description = 'Get a image of your/someone\'s avatar on trash.'
        this.usage = 'trash [@user]'
        this.example = 'trash @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Trash().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Trash <@${message.author.id}>`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "trash.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = TrashimgCommand;