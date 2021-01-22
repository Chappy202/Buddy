const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class MmsimgCommand extends Command {
    constructor() {
        super('mms', {
            aliases: ['mms'],
            category: 'Image Generation'
        });

        this.name = 'mms'
        this.description = 'Get a image of your/someone\'s avatar on a mms character.'
        this.usage = 'mms [@user]'
        this.example = 'mms @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Mms().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Mms ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "mms.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = MmsimgCommand;