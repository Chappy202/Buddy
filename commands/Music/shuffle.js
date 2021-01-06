const { Command } = require('discord-akairo');

class ShuffleCommand extends Command {
    constructor() {
        super('shuffle', {
            aliases: ['shuffle', 'shufflequeue'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true,
        });
        this.name = "shuffle"
        this.description = "Shuffles the queue"
        this.usage = "shuffle"
        this.example = "shuffle"
    }

    async exec(message) {
        const queue = this.client.player.getQueue(message);
        const voice = message.member.voice.channel;
        if (!voice) {
            const embed = this.client.util.embed()
                .setTitle(`No user found in voice channel`)
                .setColor('#f26666')
                .setDescription(`Join a voice channel and try again.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        if (!queue) {
            const embed = this.client.util.embed()
                .setTitle(`Empty Queue`)
                .setColor('#f26666')
                .setDescription(`There are no songs in the queue to shuffle!`)
                .setTimestamp()
            return message.util.send(embed);
        }

        this.client.player.shuffle(message);
        let embed = this.client.util.embed()
            .setTitle(`Shuffled Queue`)
            .setDescription(`Shuffled queue :twisted_rightwards_arrows:\nShuffled **${client.player.getQueue(message).tracks.length}** songs!`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);
        return message.util.send(embed);
    }
}

module.exports = ShuffleCommand;