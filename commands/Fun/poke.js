const { Command } = require('discord-akairo');
const nekos = require('nekos.life');
const { sfw } = new nekos();

class PokeCommand extends Command {
    constructor() {
        super('poke', {
            aliases: ['poke'],
            category: 'Fun'
        });

        this.name = 'poke'
        this.description = 'poke someone'
        this.usage = 'poke <@user>'
        this.example = 'poke @Chappy#3353'
    }

    async exec(message){
        let user = message.mentions.users.first();
        if (!user) return message.util.send(this.client.util.embed().setTitle("Couln't find user").setColor('#f26666').setDescription(`Make sure to tag someone!`).setTimestamp());
        if (message.author.id === user.id) return message.util.send(this.client.util.embed().setTitle("Uh.. Something is wrong").setColor('#f26666').setDescription(`You can't poke yourself.`).setTimestamp());

        let embed = this.client.util.embed()
            .setDescription(`Poking 👉...`)
            .setTimestamp();

        const m = await message.util.send(embed);

        let media = await sfw.poke();

        //console.log(hug.data.url);
        embed = this.client.util.embed()
            .setTitle("Poke 👉")
            .setDescription(`${message.author.tag} Poked ${user.tag}`)
            .setImage(media.url)
            .setTimestamp()
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            );

        return message.util.send(embed)
    }
}

module.exports = PokeCommand;