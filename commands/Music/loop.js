const { Command } = require('discord-akairo');

class LoopCommand extends Command {
    constructor() {
        super('loop', {
            aliases: ['loop', 'repeat'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            args: [{
                id: 'type',
                type: 'string'
            }],
            guildOnly: true
        });
        this.name = "loop"
        this.description = "Repeats the current playing song"
        this.usage = "loop>"
        this.example = "loop"
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

        if (args.type.toLowerCase() === 'queue') {
            if (this.client.player.getQueue(message).loopMode) {
                this.client.player.setLoopMode(message, false);
                const embed = this.client.util.embed()
                    .setTitle(`Stopped Repeating`)
                    .setDescription(`Repeat mode **Disabled**`)
                    .setTimestamp()
                    .setFooter(`Req by: ${message.author.tag}`);
                return message.util.send(embed);
            } else {
                this.client.player.setLoopMode(message, true);
                const embed = this.client.util.embed()
                    .setTitle(`Repeating`)
                    .setDescription(`Repeat mode **Enabled**\nThe entire queue will be repeated endlessly!`)
                    .setTimestamp()
                    .setFooter(`Req by: ${message.author.tag}`);
                return message.util.send(embed);
            }
        } else {
            if (this.client.player.getQueue(message).repeatMode) {
                this.client.player.setRepeatMode(message, false);
                const embed = this.client.util.embed()
                    .setTitle(`Stopped Repeating`)
                    .setDescription(`Repeat mode **Disabled**`)
                    .setTimestamp()
                    .setFooter(`Req by: ${message.author.tag}`);
                return message.util.send(embed);
            } else {
                this.client.player.setRepeatMode(message, true);
                const embed = this.client.util.embed()
                    .setTitle(`Repeating`)
                    .setDescription(`Repeat mode **Enabled**\nThe current song will be repeated endlessly!`)
                    .setTimestamp()
                    .setFooter(`Req by: ${message.author.tag}`);
                return message.util.send(embed);
            }
        }
    }
}

module.exports = LoopCommand;