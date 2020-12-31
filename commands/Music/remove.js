const { Command } = require('discord-akairo');

class RemoveCommand extends Command {
    constructor() {
        super('remove', {
            aliases: ['remove', 'delete'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true,
            args: [{
                id: 'songid',
                type: 'string'
            }]
        });
        this.name = "remove"
        this.description = "Remove a song from the queue"
        this.usage = "remove"
        this.example = "remove"
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

        let queue = await this.client.player.getQueue(message.guild.id);
        if (queue) {
            let SongID = parseInt(args.songid) - 1;
            this.client.player.remove(message.guild.id, SongID).then(() => {
                let embed = this.client.util.embed()
                    .setTitle(`Removed: ${query}`)
                    .setDescription(`Removed song from queue :wastebasket:`)
                    .setTimestamp()
                    .setFooter(`Req by: ${message.author.tag}`);
                return message.util.send(embed);
            }).catch((err) => {
                this.client.logger.log('error', `Something went wrong while trying to remove a song: ${err}`);
            });
        } else {
            let embed = this.client.util.embed()
                .setAuthor(`${message.guild.name} Music Queue`, message.guild.iconURL())
                .setColor(`#f26666`)
                .setDescription(`There are no songs in the queue!`)
                .setTimestamp()
                .setFooter(`Req by: ${message.author.tag}`)
            return message.util.send(embed);
        }
    }
}

module.exports = RemoveCommand;