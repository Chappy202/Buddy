const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class TatooimgCommand extends Command {
    constructor() {
        super('tattoo', {
            aliases: ['tattoo', 'tatoo'],
            category: 'Image Generation'
        });

        this.name = 'tattoo'
        this.description = 'Get a image of your/someone\'s avatar on a Tattoo comic.'
        this.usage = 'tattoo [@user]'
        this.example = 'tattoo @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Tatoo().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Tattoo <@${message.author.id}>`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "tattoo.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = TatooimgCommand;