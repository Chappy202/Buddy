const { Command } = require('discord-akairo');

class addToQueueCommand extends Command {
    constructor() {
        super('add', {
            aliases: ['add', 'addsong'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true,
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
            }
        });
        this.name = "add"
        this.description = "Add a song/playlist to the queue"
        this.usage = "add"
        this.example = "add"
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

        if (isPlaying) {
            let song = await this.client.player.addToQueue(message.guild.id, query);
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
            let song = await this.client.player.addToQueue(message.guild.id, query);
            song = song.song;
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
}

module.exports = addToQueueCommand;