const { Command } = require('discord-akairo');
const Discord = require("discord.js")
const DIG = require('discord-image-generation');

class BeautifulImgCommand extends Command {
    constructor() {
        super('beautifulimg', {
            aliases: ['beautifulimg'],
            category: 'Image Generation'
        });

        this.name = 'beautifulimg'
        this.description = 'Get a image of your/someone\'s avatar being beautiful.'
        this.usage = 'beautifulimg [@user]'
        this.example = 'beautifulimg @Chappy'
    }

    async exec(message) {
        let user = message.mentions.users.first();
        if (!user){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Beautiful().getImage(avatar);
            let embed = this.client.util.embed()
                .setAuthor(`Beautiful ${message.author.tag}`, message.author.avatarURL())
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp();
            message.util.send(embed);
            let m = await message.util.sendNew('Loading...');
            let attach = new Discord.MessageAttachment(img, "beautiful.png");
            await message.util.sendNew(attach);
            return m.delete();
        }
    }
}

module.exports = BeautifulImgCommand;