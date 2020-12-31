const { Command } = require('discord-akairo');

class GetQueueCommand extends Command {
    constructor() {
        super('queue', {
            aliases: ['queue', 'getqueue'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true,
        });
        this.name = "queue"
        this.description = "Displays the current queue."
        this.usage = "queue"
        this.example = "queue"
    }

    async exec(message) {
        let queue = await this.client.player.getQueue(message.guild.id);
        if (queue) {
            this.client.player.clearQueue(message.guild.id);
            let embed = this.client.util.embed()
                .setAuthor(`${message.guild.name} Music Queue`, message.guild.iconURL())
                .setDescription(`${queue.songs.map((song, i) => {
                    return `${i === 0 ? 'Now Playing' : `#${i+1}`} - ${song.name}`
                }).join('\n')}`)
                .setTimestamp()
                .setFooter(`Req by: ${message.author.tag}`)
            return message.util.send(embed);
        } else {
            let embed = this.client.util.embed()
                .setAuthor(`${message.guild.name} Music Queue`, message.guild.iconURL())
                .setColor(`#f26666`)
                .setDescription(`There are no songs in the queue!`)
                .setTimestamp()
                .setFooter(`Req by: ${message.author.tag}`)
            return message.util.send(embed);
        }
    }
}

module.exports = GetQueueCommand;