const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class NotstonkimgCommand extends Command {
    constructor() {
        super('notstonk', {
            aliases: ['notstonk'],
            category: 'Image Generation'
        });

        this.name = 'notstonk'
        this.description = 'Get a image of your/someone\'s avatar on a not stonk image.'
        this.usage = 'notstonk [@user]'
        this.example = 'notstonk @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.NotStonk().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`NotStonk ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "notstonk.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = NotstonkimgCommand;