const { Command } = require('discord-akairo');

class PauseCommand extends Command {
    constructor() {
        super('pause', {
            aliases: ['pause'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true,
        });
        this.name = "pause"
        this.description = "Pause the current playing song."
        this.usage = "pause"
        this.example = "pause"
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

        let embed = new this.client.util.embed()
            .setTitle(`Paused: ${song.name}`)
            .setDescription(`Song Paused :pause_button:`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);
        return message.util.send(embed);
    }
}

module.exports = PauseCommand;