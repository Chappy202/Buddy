const { Command } = require('discord-akairo');

class SkipCommand extends Command {
    constructor() {
        super('skip', {
            aliases: ['skip'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "skip"
        this.description = "Skips the current playing song."
        this.usage = "skip"
        this.example = "skip"
    }

    async skipSong(message, embed, m){
        this.client.player.skip(message);
        embed.setDescription(`Skipped :track_next:`);
        m.edit(embed);
    }

    async exec(message) {
        const queue = this.client.player.getQueue(message);
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

        if (!queue.tracks[0]){
            const embed = this.client.util.embed()
                .setTitle(`This is the last song in the queue`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`I was unable to skip this song. There's no song after this one!`)
                .setTimestamp()
            return message.util.send(embed);
        }

        const members = voice.members.filter((m) => !m.user.bot);
        const embed = this.client.util.embed()
            .setTitle(`Skip: ${queue.tracks[0].title}`)
            .setThumbnail(`${queue.tracks[0].thumbnail}`)
            .setDescription(`Skipped :track_next:`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);

        const m = await message.util.send(embed);

        if (members.size > 1) {
            if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.find(r => r.name === "DJ")) {
                await this.skipSong(message, embed, m);
            } else {
                m.react("👍");
                const mustVote = Math.floor(members.size/2+1);
                embed.setDescription(`Next song: ${queue.tracks[0].title}\nReact with 👍 to skip the music! ${mustVote} more votes are required.`);
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
                        embed.setDescription(`Skipped :track_next:`);
                        m.edit(embed);
                        collector.stop(true);
                    } else {
                        embed.setDescription(`Next song: ${queue.tracks[0].title}\nReact with 👍 to skip the music! ${mustVote} more votes are required.`);
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
            }
        } else {
            await this.skipSong(message, embed, m);
        }

    }
}

module.exports = SkipCommand;