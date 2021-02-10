const { Command } = require('discord-akairo');

class NowPlayingCommand extends Command {
    constructor() {
        super('nowplaying', {
            aliases: ['nowplaying', 'np'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "nowplaying"
        this.description = "View the current playing song"
        this.usage = "nowplaying"
        this.example = "nowplaying"
    }

    async exec(message) {
        const queue = this.client.player.getQueue(message);
        const voice = message.member.voice.channel;
        if (!voice) {
            const embed = this.client.util.embed()
                .setTitle(`No user found in voice channel`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`Join a voice channel and try again.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        if (!queue) {
            const embed = this.client.util.embed()
                .setTitle(`No song playing`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`"No songs are currently playing in this server.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        // Get the current song
        const track = this.client.player.nowPlaying(message);

        if (!track) {
            this.client.player.clearQueue(message);
            const embed = this.client.util.embed()
                .setTitle(`No song playing`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`No songs are currently playing in this server.\n*Leaving voice...*`)
                .setTimestamp()
            if (message.guild.me.voice.channel) {
                message.guild.me.voice.channel.leave();
            }
            return message.util.send(embed);
        }

        // Generate discord embed to display song info
        const embed = this.client.util.embed()
            .setAuthor(`Currently playing`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(`${track.thumbnail}`)
            .setTitle(track.title)
            .setURL(track.url)
            //.addField(`Title`, `${track.title}`)
            .addField(`Channel`, `${track.author}`, true)
            .addField(`Duration`, `${this.client.util.millisToDuration(track.durationMS)}`, true)
            .addField(`Description`, track.description ? (track.description.substring(0, 150)+"\n"+(`And more...`).toLowerCase()) : `No description...`)
            .addField("\u200B", this.client.player.createProgressBar(message, { timecodes: true }))
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);

        return message.util.send(embed);
    }
}

module.exports = NowPlayingCommand;