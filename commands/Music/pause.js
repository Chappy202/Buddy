const { Command } = require('discord-akairo');

class PauseCommand extends Command {
    constructor() {
        super('pause', {
            aliases: ['pause'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "pause"
        this.description = "Pause the current playing song"
        this.usage = "pause"
        this.example = "pause"
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
                .setDescription(`No songs are currently playing in this server.`)
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

        // Get the current song and pause it
        await this.client.player.pause(message);
        // Send pause feedback
        let embed = this.client.util.embed()
            .setTitle(`Paused: ${track.title}`)
            .setURL(`${track.url}`)
            .setDescription(`Song Paused :pause_button:`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);
        return message.util.send(embed);
    }
}

module.exports = PauseCommand;