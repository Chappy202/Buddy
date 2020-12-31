const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');


class PlayCommand extends Command {
    constructor() {
        super('play', {
            aliases: ['play', 'p'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            * args() {
                const query = yield {
                    match: "content",
                    prompt: {
                        start: (msg, text) =>
                            `What song or playlist would you like to listen to?`
                    },
                    type: "string",
                    validate: function (query) {
                        return query.length > 0 && query.length < 200;
                    }
                };
                return {
                    query
                };
            },
            guildOnly: true
        });
        this.name = "play"
        this.description = "Play Music in a voice channel"
        this.usage = "play"
        this.example = "play"
    }

    async exec(message, { query }) {
        const voiceChannel = message.member.voice.channel;
        let isPlaying = this.client.player.isPlaying(message.guild.id);

        if (!voiceChannel) {
            return message.util.send(this.client.util.emptyVoiceChannel());
        }

        // Check whether or not link is a playlist
        let playlistRegExp =  /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
        if (query.match(playlistRegExp)) {
            let playlist = await this.client.player.playlist(message.guild.id, query, voiceChannel, 200, message.author.tag);
            let song = playlist.song;
            playlist = playlist.playlist;
            //console.log(playlist);
            let embed = new MessageEmbed()
                .setTitle(`Added Playlist to Queue ➤ ${song.name}`)
                .setURL(`${song.url}`)
                .setColor(process.env.BASECOLOR)
                .setDescription(`Songs: ${playlist.videoCount}\nAuthor: ${playlist.channel}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp()
                .setFooter(`Req by: ${(playlist.requestedBy) ? playlist.requestedBy : 'Unknown'}`);
            await message.util.send(embed);

            if (!isPlaying) {
                let embed = new MessageEmbed()
                    .setTitle(`Playing ➤ ${song.name}`)
                    .setURL(`${song.url}`)
                    .setColor(process.env.BASECOLOR)
                    .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                    .setThumbnail(`${song.thumbnail}`)
                    .setTimestamp()
                    .setFooter(`Req by: ${(song.requestedBy) ? song.requestedBy : 'Unknown'}`);
                return message.util.send(embed);
            }
        }

        // If there is a song playing, add the new one to the queue, otherwise start playing. (For a single song)
        if (isPlaying) {
            let song = await this.client.player.addToQueue(message.guild.id, query, {}, message.author.tag);
            song = song.song;
            let embed = new MessageEmbed()
                .setTitle(`Added ➤ ${song.name}`)
                .setURL(`${song.url}`)
                .setColor(process.env.BASECOLOR)
                .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp()
                .setFooter(`Req by: ${(song.requestedBy) ? song.requestedBy : 'Unknown'}`);
            return message.util.send(embed);
        } else {
            try {
                let song = await this.client.player.play(voiceChannel, query, {}, message.author.tag);
                song = song.song;
                //console.log(song);
                let embed = new MessageEmbed()
                    .setTitle(`Playing ➤ ${song.name}`)
                    .setURL(`${song.url}`)
                    .setColor(process.env.BASECOLOR)
                    .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                    .setThumbnail(`${song.thumbnail}`)
                    .setTimestamp()
                    .setFooter(`Req by: ${(song.requestedBy) ? song.requestedBy : 'Unknown'}`);
                return message.util.send(embed);
            } catch (err) {
                this.client.logger.log('error', `Playback Error: ${err}`);
                let embed = new MessageEmbed()
                    .setTitle(`Something went wrong.`)
                    .setColor(`#f26666`)
                    .setDescription(`I was unable to play ${song.name}`)
                    .setTimestamp()
                return message.util.send(embed);
            }
        }
    }
}

module.exports = PlayCommand;