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
        const queue = this.client.player.getQueue(message);
        const voice = message.member.voice.channel;
        if (!voice) {
            const embed = this.client.util.embed()
                .setTitle(`No user found in voice channel`)
                .setColor('#f26666')
                .setDescription(`Join a voice channel and try again.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        if (!queue) {
            const embed = this.client.util.embed()
                .setTitle(`No song playing`)
                .setColor('#f26666')
                .setDescription(`No songs are currently playing in this server.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        if (!args.volume || isNaN(args.volume) || args.volume === 'Infinity') {
            const embed = this.client.util.embed()
                .setTitle(`Invalid Number`)
                .setColor('#f26666')
                .setDescription(`Please enter a valid number!`)
                .setTimestamp()
            return message.util.send(embed);
        }

        if (Math.round(parseInt(args.volume)) < 1 || Math.round(parseInt(args.volume)) > 100) {
            const embed = this.client.util.embed()
                .setTitle(`Invalid Number`)
                .setColor('#f26666')
                .setDescription(`Please enter a valid number (between 1 and 100)`)
                .setTimestamp()
            return message.util.send(embed);
        }

        this.client.player.setVolume(message, parseInt(args.volume));
        const embed = new this.client.util.embed()
            .setTitle(`Volume set to ${args.volume}%`)
            .setDescription(`Volume adjusted :speaker:`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);
        return message.util.send(embed);
    }
}

module.exports = SetVolumeCommand;