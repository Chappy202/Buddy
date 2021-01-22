const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class TatooimgCommand extends Command {
    constructor() {
        super('tatoo', {
            aliases: ['tatoo'],
            category: 'Image Generation'
        });

        this.name = 'tatoo'
        this.description = 'Get a image of your/someone\'s avatar on a Tatoo comic.'
        this.usage = 'tatoo [@user]'
        this.example = 'tatoo @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Tatoo().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Tatoo ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "tatoo.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = TatooimgCommand;