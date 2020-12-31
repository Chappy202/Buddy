const { Command } = require('discord-akairo');

class NowPlayingCommand extends Command {
    constructor() {
        super('nowplaying', {
            aliases: ['nowplaying', 'np'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "nowplaying"
        this.description = "View the current playing song"
        this.usage = "nowplaying"
        this.example = "nowplaying"
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

        let song = await this.client.player.nowPlaying(message.guild.id);
        let progressBar = this.client.player.createProgressBar(message.guild.id, 20, '➤', '▬');
        let embed = this.client.util.embed()
            .setTitle(`${message.guild.name} Current Song`)
            .setDescription(`Current song: ${song.name}\n${progressBar}`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`)
        return message.util.send(embed);
    }
}

module.exports = NowPlayingCommand;