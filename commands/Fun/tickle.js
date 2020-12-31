const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class TickleCommand extends Command {
    constructor() {
        super('tickle', {
            aliases: ['tickle'],
            category: 'Fun'
        });

        this.name = 'tickle'
        this.description = 'Tickle someone'
        this.usage = 'tickle <@user>'
        this.example = 'tickle @Chappy#3353'
    }

    async exec(message){
        let user = message.mentions.users.first();
        if (!user) return message.util.send(this.client.util.embed().setTitle("Couln't find user").setColor('#f26666').setDescription(`Make sure to tag someone!`).setTimestamp());
        if (message.author.id === user.id) return message.util.send(this.client.util.embed().setTitle("Uh.. Something is wrong").setColor('#f26666').setDescription(`You can't tickle yourself.`).setTimestamp());

        let embed = this.client.util.embed()
            .setDescription(`Tickling 😂...`)
            .setTimestamp();

        const m = await message.util.send(embed);

        let media = await sfw.tickle();

        //console.log(hug.data.url);
        embed = this.client.util.embed()
            .setTitle("Tickle 😂")
            .setDescription(`${message.author.tag} Tickled ${user.tag}`)
            .setImage(media.url)
            .setTimestamp()
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            );

        return message.util.send(embed)
    }
}

module.exports = TickleCommand;