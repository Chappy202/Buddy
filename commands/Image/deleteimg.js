const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class DeleteimgCommand extends Command {
    constructor() {
        super('deleteimg', {
            aliases: ['deleteimg'],
            category: 'Image Generation'
        });

        this.name = 'deleteimg'
        this.description = 'Delete your own, or some else\'s avatar.'
        this.usage = 'deleteimg [@user]'
        this.example = 'deleteimg @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Delete().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Delete ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "confusedstonks.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = DeleteimgCommand;