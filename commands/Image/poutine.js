const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class PoutineimgCommand extends Command {
    constructor() {
        super('poutine', {
            aliases: ['poutine'],
            category: 'Image Generation'
        });

        this.name = 'poutine'
        this.description = 'Get a image of your/someone\'s avatar on a poutine image.'
        this.usage = 'poutine [@user]'
        this.example = 'poutine @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Poutine().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Poutine ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "poutine.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = PoutineimgCommand;