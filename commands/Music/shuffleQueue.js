const { Command } = require('discord-akairo');

class ShuffleQueueCommand extends Command {
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
        let queue = await this.client.player.getQueue(message.guild.id);
        if (queue) {
            let embed = this.client.util.embed()
                .setTitle(`Shuffled Queue`)
                .setDescription(`Shuffled queue :twisted_rightwards_arrows:`)
                .setTimestamp()
                .setFooter(`Req by: ${message.author.tag}`);
            return message.util.send(embed);
        } else {
            let embed = this.client.util.embed()
                .setAuthor(`${message.guild.name} Music Queue`, message.guild.iconURL())
                .setColor(`#f26666`)
                .setDescription(`There are no songs in the queue!`)
                .setTimestamp()
                .setFooter(`Req by: ${message.author.tag}`);
            return message.util.send(embed);
        }
    }
}

module.exports = ShuffleQueueCommand;