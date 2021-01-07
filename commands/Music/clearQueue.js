const { Command } = require('discord-akairo');

class ClearQueueCommand extends Command {
    constructor() {
        super('clearqueue', {
            aliases: ['clearqueue', 'clear'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "clearqueue"
        this.description = "Clear the song queue"
        this.usage = "clearqueue"
        this.example = "clearqueue"
    }

    async exec(message) {
        const voice = message.member.voice.channel;
        if (!voice){
            const embed = this.client.util.embed()
                .setTitle(`No user found in voice channel`)
                .setColor('#f26666')
                .setDescription(`Join a voice channel and try again.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        const queue = this.client.player.getQueue(message);

        if (!queue) {
            const embed = this.client.util.embed()
                .setTitle(`Empty Queue`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`The queue is already empty!`)
                .setTimestamp()
            return message.util.send(embed);
        }

        if (queue.tracks.length <= 1) {
            const embed = this.client.util.embed()
                .setTitle(`Not enough songs`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`There is only one song in the queue.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        this.client.player.clearQueue(message);
        let embed = this.client.util.embed()
            .setTitle(`Cleared the queue`)
            .setDescription(`There are no songs left in the queue.`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`)
        return message.util.send(embed);
    }
}

module.exports = ClearQueueCommand;