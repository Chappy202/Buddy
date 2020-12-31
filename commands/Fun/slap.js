const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class SlapCommand extends Command {
    constructor() {
        super('slap', {
            aliases: ['slap'],
            category: 'Fun'
        });

        this.name = 'slap'
        this.description = 'Slap someone'
        this.usage = 'slap <@user>'
        this.example = 'slap @Chappy#3353'
    }

    async exec(message){
        let user = message.mentions.users.first();
        if (!user) return message.util.send(this.client.util.embed().setTitle("Couln't find user").setColor('#f26666').setDescription(`Make sure to tag someone!`).setTimestamp());
        if (message.author.id === user.id) return message.util.send(this.client.util.embed().setTitle("Uh.. Something is wrong").setColor('#f26666').setDescription(`You can't slap yourself.`).setTimestamp());

        let embed = this.client.util.embed()
            .setDescription(`Slapping 👏...`)
            .setTimestamp();

        const m = await message.util.send(embed);

        let media = await sfw.slap();

        //console.log(hug.data.url);
        embed = this.client.util.embed()
            .setTitle("Slap 👏")
            .setDescription(`${message.author.tag} Slapped ${user.tag}`)
            .setImage(media.url)
            .setTimestamp()
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            );

        return message.util.send(embed)
    }
}

module.exports = SlapCommand;