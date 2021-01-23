const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class TriggeredCommand extends Command {
    constructor() {
        super('triggered', {
            aliases: ['triggered'],
            category: 'Image Generation'
        });

        this.name = 'triggered'
        this.description = 'Get a gif of your/someone\'s avatar being triggered.'
        this.usage = 'triggered [@user]'
        this.example = 'triggered @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Triggered().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Triggered <@${message.author.id}>`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "triggered.gif");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = TriggeredCommand;