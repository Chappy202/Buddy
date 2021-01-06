const { Command } = require('discord-akairo');

class BackCommand extends Command {
    constructor() {
        super('back', {
            aliases: ['back', 'previous'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "back"
        this.description = "Play the previous song"
        this.usage = "back"
        this.example = "back"
    }

    async exec(message, { query }) {
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
                .setDescription(`"No songs are currently playing in this server.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        if (!queue.previousTracks[0]){
            const embed = this.client.util.embed()
                .setTitle(`No previous song`)
                .setColor('#f26666')
                .setDescription(`There was no song before this one!`)
                .setTimestamp()
            return message.util.send(embed);
        }

        const members = voice.members.filter((m) => !m.user.bot);
        const embed = this.client.util.embed()
            .setTitle(`Play the previous song`)
            .setThumbnail(`${queue.tracks[0].thumbnail}`)
            .setFooter(`Req by: ${message.author.tag}`)
            .setTimestamp()

        const m = await message.util.send(embed);

        if (members.size > 1) {
            m.react("👍");

            const mustVote = Math.floor(members.size/2+1);

            embed.setDescription(`Previous song: ${queue.tracks[0].title}\nReact with 👍 to play the previous song! ${mustVote} more votes are required.`);
            m.edit(embed);
            const filter = (reaction, user) => {
                const member = message.guild.members.cache.get(user.id);
                const voiceChannel = member.voice.channel;
                if(voiceChannel){
                    return voiceChannel.id === voice.id;
                }
            };
            const collector = await m.createReactionCollector(filter, {
                time: 25000
            });
            collector.on("collect", (reaction) => {
                const haveVoted = reaction.count-1;
                if(haveVoted >= mustVote){
                    this.client.player.skip(message);
                    embed.setDescription(`Playing previous :track_previous:`);
                    m.edit(embed);
                    collector.stop(true);
                } else {
                    embed.setDescription(`Previous song: ${queue.tracks[0].title}\nReact with 👍 to play the previous song! ${mustVote} more votes are required.`);
                    m.edit(embed);
                }
            });

            collector.on("end", (collected, isDone) => {
                if (isDone) {
                    const output = this.client.util.embed()
                        .setColor(`#f26666`)
                        .setTitle(`Time is up`)
                        .setDescription(`Time's up! Please send the command again!`)
                        .setTimestamp()

                    return message.util.send(output);
                }
            });
        } else {
            this.client.player.back(message);
            embed.setDescription(`Playing previous :track_previous:`);
            return m.edit(embed);
        }
    }
}

module.exports = BackCommand;