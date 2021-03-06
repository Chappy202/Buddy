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

    async stopMusic(message, embed, m){
        this.client.player.stop(message);
        embed.setTitle(`Stopped Music`);
        embed.setDescription(`Music Stopped :stop_button:\nCleared Queue :wastebasket:\nLeft the channel.`);
        m.edit(embed);
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
            .setTitle(`Stopping Music...`)
            .setDescription(`_Ending current playback.._`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);

        if (message.content.substring(1) === 'fuckoff'){
            embed.setTitle(`That's not very nice...`);
            embed.setDescription(`_Guess I'll just leave.._`);
        } else if (message.content.substring(1) === 'leave' || message.content.substring(1) === 'bye'){
            embed.setTitle(`Leaving...`);
            embed.setDescription(`_Cleared the queue and left the channel.._`)
        }

        const m = await message.util.send(embed);

        // Get the current song
        const track = this.client.player.nowPlaying(message);

        if (!track) {
            this.client.player.clearQueue(message);
            const embed = this.client.util.embed()
                .setTitle(`No song playing`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`No songs are currently playing in this server.\n*Leaving voice...*`)
                .setTimestamp()
            if (message.guild.me.voice.channel) {
                message.guild.me.voice.channel.leave();
            }
            return message.util.send(embed);
        }

        if (members.size > 1){
            if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.find(r => r.name === "DJ")) {
                this.stopMusic(message, embed, m);
            } else {
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
                        embed.setTitle(`Stopped Music`);
                        embed.setDescription(`Music Stopped :stop_button:\nCleared Queue :wastebasket:\nLeft the channel.`);
                        m.edit(embed);
                        collector.stop(true);
                    } else {
                        embed.setDescription(`React with 👍 to stop the music! ${mustVote} more votes are required.`);
                        m.edit(embed);
                    }
                });

                collector.on("end", (collected, isDone) => {
                    if (!isDone) {
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
            this.stopMusic(message, embed, m);
        }
    }
}

module.exports = StopCommand;