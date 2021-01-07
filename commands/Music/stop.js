const { Command } = require('discord-akairo');

class StopCommand extends Command {
    constructor() {
        super('stop', {
            aliases: ['stop', 'leave', 'fuckoff', 'bye'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "stop"
        this.description = "Stop playing Music in a voice channel"
        this.usage = "stop"
        this.example = "stop"
    }

    async exec(message) {
        const queue = await this.client.player.getQueue(message);
        const voice = message.member.voice.channel;
        if (!voice) {
            const embed = this.client.util.embed()
                .setTitle(`No user found in voice channel`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`Join a voice channel and try again.`)
                .setTimestamp()
            return message.util.send(embed);
        }
        if (!queue) {
            const embed = this.client.util.embed()
                .setTitle(`No song playing`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`No songs are currently playing in this server.`)
                .setTimestamp()
            return message.util.send(embed);
        }
        const members = voice.members.filter((m) => !m.user.bot);
        const embed = this.client.util.embed()
            .setTitle(`Stopped`)
            .setDescription(`Music Stopped :stop_button:\nCleared Queue :wastebasket:\n*Left the channel.*`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`)

        const m = await message.util.send(embed);

        if (members.size > 1){
            m.react("👍");
            const mustVote = Math.floor(members.size/2+1);
            embed.setDescription(`React with 👍 to stop the music! ${mustVote} more votes are required.`);
            m.edit(embed);

            const filter = (reaction, user) => {
                const member = message.guild.members.cache.get(user.id);
                const voiceChannel = member.voice.channel;
                if (voiceChannel){
                    return voiceChannel.id === voice.id;
                }
            };

            const collector = await m.createReactionCollector(filter, {
                time: 25000
            });

            collector.on("collect", (reaction) => {
                const haveVoted = reaction.count-1;
                if(haveVoted >= mustVote){
                    this.client.player.stop(message);
                    embed.setDescription(`Music Stopped:stop_button:\nCleared Queue :wastebasket:\nLeft the channel.`);
                    m.edit(embed);
                    collector.stop(true);
                } else {
                    embed.setDescription(`React with 👍 to stop the music! ${mustVote} more votes are required.`);
                    m.edit(embed);
                }
            });

            collector.on("end", (collected, isDone) => {
                if (isDone) {
                    const output = this.client.util.embed()
                        .setColor(process.env.ERRORCOLOR)
                        .setTitle(`Time is up`)
                        .setDescription(`Time's up! Please send the command again!`)
                        .setTimestamp()

                    return message.util.send(output);
                }
            });
        } else {
            this.client.player.stop(message);
            embed.setDescription(`Music Stopped:stop_button:\nCleared Queue :wastebasket:\nLeft the channel.`);
            m.edit(embed);
        }
    }
}

module.exports = StopCommand;