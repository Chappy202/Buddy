const { Command } = require('discord-akairo');

class SetVolumeCommand extends Command {
    constructor() {
        super('volume', {
            aliases: ['volume'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true,
            args: [
                {
                    id: 'volume',
                    type: 'string'
                }
            ],
        });
        this.name = "volume"
        this.description = "Sets Buddy's volume"
        this.usage = "volume <%>"
        this.example = "volume 100"
    }

    async exec(message, args) {
        const voiceChannel = message.member.voice.channel;
        let isPlaying = this.client.player.isPlaying(message.guild.id);

        if (!voiceChannel) {
            return message.util.send(this.client.util.emptyVoiceChannel());
        }

        if (!isPlaying) {
            return message.util.send(this.client.util.noPlaying());
        }

        this.client.player.setVolume(message.guild.id, parseInt(args.volume));
        let embed = new this.client.util.embed()
            .setTitle(`Volume set to ${args.volume}%`)
            .setDescription(`Volume adjusted :speaker:`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);
        return message.util.send(embed);
    }
}

module.exports = SetVolumeCommand;