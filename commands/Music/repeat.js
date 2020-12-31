const { Command } = require('discord-akairo');

class RepeatCommand extends Command {
    constructor() {
        super('repeat', {
            aliases: ['repeat', 'loop'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true,
        });
        this.name = "repeat"
        this.description = "Repeats the current playing song"
        this.usage = "repeat"
        this.example = "repeat"
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

        let toggle = this.client.player.toggleLoop(message.guild.id);
        let song = this.client.player.nowPlaying(message.guild.id);
        if (toggle) {
            let embed = this.client.util.embed()
                .setTitle(`Repeating ➤ ${song.name}`)
                .setURL(`${song.url}`)
                .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp()
                .setFooter(`Req by: ${song.requestedBy}`);
            return message.util.send(embed);
        } else {
            let embed = this.client.util.embed()
                .setTitle(`Stopped Repeating ➤ ${song.name}`)
                .setURL(`${song.url}`)
                .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp()
                .setFooter(`Req by: ${song.requestedBy}`);
            return message.util.send(embed);
        }
    }
}

module.exports = RepeatCommand;