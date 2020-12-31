const { Command } = require('discord-akairo');

class ClearQueueCommand extends Command {
    constructor() {
        super('clearqueue', {
            aliases: ['clearqueue', 'clear'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true,
        });
        this.name = "clear"
        this.description = "Clear the song queue"
        this.usage = "clear"
        this.example = "clear"
    }

    async exec(message) {
        let queue = await this.client.player.getQueue(message.guild.id);
        if (!queue) {
            this.client.player.clearQueue(message.guild.id);
            let embed = this.client.util.embed()
                .setTitle(`Cleared the queue`)
                .setDescription(`There are no songs left in the queue.`)
                .setTimestamp()
                .setFooter(`Req by: ${message.author.tag}`)
            return message.util.send(embed);
        } else {
            let embed = this.client.util.embed()
                .setTitle(`Queue already empty!`)
                .setColor(`#f26666`)
                .setDescription(`The queue is already empty!`)
                .setTimestamp()
                .setFooter(`Req by: ${message.author.tag}`)
            return message.util.send(embed);
        }
    }
}

module.exports = ClearQueueCommand;