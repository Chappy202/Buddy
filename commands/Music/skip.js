const { Command } = require('discord-akairo');

class SkipCommand extends Command {
    constructor() {
        super('skip', {
            aliases: ['skip', 'sk'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true,
        });
        this.name = "skip"
        this.description = "Skips the current playing song."
        this.usage = "skip"
        this.example = "skip"
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

        let song = await this.client.player.skip(message.guild.id);
        song = song.song;
        let embed = new this.client.util.embed()
            .setTitle(`Skipped: ${song.name}`)
            .setDescription(`Skipped :track_next:`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);
        return message.util.send(embed);
    }
}

module.exports = SkipCommand;