const { Command } = require('discord-akairo');

class StopCommand extends Command {
    constructor() {
        super('stop', {
            aliases: ['stop', 's'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "stop"
        this.description = "Stop the current playing music and clear the queue"
        this.usage = "stop"
        this.example = "stop"
    }

    async exec(message) {
        const voiceChannel = message.member.voice.channel;
        let isPlaying = this.client.player.isPlaying(message.guild.id);

        if (!voiceChannel) {
            return message.util.send(this.client.util.emptyVoiceChannel());
        }

        if (!isPlaying) {
            return message.util.send(this.client.util.noPlaying());
        }

        this.client.player.stop(message.guild.id);
        let embed = this.client.util.embed()
            .setTitle(`Stopped`)
            .setDescription(`Music Stopped :stop_button:\nCleared Queue :wastebasket:`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`)
        return message.util.send(embed);
    }
}

module.exports = StopCommand;