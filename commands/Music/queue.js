const { Command } = require('discord-akairo');
const Pagination = require('discord-paginationembed');

class QueueCommand extends Command {
    constructor() {
        super('queue', {
            aliases: ['queue', 'playlist'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "queue"
        this.description = "Displays the current queue."
        this.usage = "queue"
        this.example = "queue"
    }

    async exec(message) {
        const voice = message.member.voice.channel;
        if (!voice){
            const embed = this.client.util.embed()
                .setTitle(`No user found in voice channel`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`Join a voice channel and try again.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        const queue = this.client.player.getQueue(message);

        if (!queue) {
            const embed = this.client.util.embed()
                .setTitle(`No song playing`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`No songs are currently playing in this server.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        if (queue.tracks.length === 1) {
            const embed = this.client.util.embed()
                .setAuthor(`Server Queue`, message.guild.iconURL({ dynamic: true }))
                .addField(`Currently playing`, `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Requested by ${queue.tracks[0].requestedBy}*\n`)
            return message.channel.send(embed);
        }

        let i = 0;

        const FieldsEmbed = new Pagination.FieldsEmbed();

        FieldsEmbed.embed
            .setColor(process.env.BASECOLOR)
            .setAuthor(`Server Queue`, message.guild.iconURL({ dynamic: true }))
            .addField(`Currently playing`, `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Req by ${queue.tracks[0].requestedBy}*\n`, true)
            .addField(` QueueProgress`, this.client.player.createProgressBar(message, { timecodes: true, queue: true }), true);

        FieldsEmbed.setArray(queue.tracks[1] ? queue.tracks.slice(1, queue.tracks.length) : [])
            .setAuthorizedUsers([message.author.id])
            .setChannel(message.channel)
            .setElementsPerPage(5)
            .setPageIndicator(true)
            .formatField("Queue", (track) => `${++i}. [${track.title}](${track.url})\n*Req by ${track.requestedBy}*`);

        await FieldsEmbed.build();
        return message.delete();
    }
}

module.exports = QueueCommand;