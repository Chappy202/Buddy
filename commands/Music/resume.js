const { Command } = require('discord-akairo');

class ResumeCommand extends Command {
    constructor() {
        super('resume', {
            aliases: ['resume'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "resume"
        this.description = "Resumes the current paused song"
        this.usage = "resume"
        this.example = "resume"
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

        // Get the current song and pause it
        await this.client.player.resume(message);
        const track = this.client.player.nowPlaying(message);
        // Send pause feedback
        let embed = this.client.util.embed()
            .setTitle(`Resumed: ${track.title}`)
            .setURL(`${track.url}`)
            .setDescription(`Song Resumed :arrow_forward:`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);
        return message.util.send(embed);
    }
}

module.exports = ResumeCommand;