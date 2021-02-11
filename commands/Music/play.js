const { Command } = require('discord-akairo');

class PlayCommand extends Command {
    constructor() {
        super('play', {
            aliases: ['play', 'p', 'add'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            * args() {
                const embed = {
                    color: process.env.BASECOLOR,
                    title: 'What song 🎵',
                    description: 'What song would you like to play? 🎶',
                    timestamp: new Date()
                }
                const query = yield {
                    match: "content",
                    prompt: {
                        start: { embed }
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
        this.usage = "play <song>"
        this.example = "play perfect - ed sheeran"
    }

    async exec(message, { query }) {
        if (!query) {
            const embed = this.client.util.embed()
                .setTitle(`No song specified`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`Please provide a song name or link.`)
                .setTimestamp()
            return message.util.send(embed);
        }
        const voice = message.member.voice.channel;
        if (!voice) {
            const embed = this.client.util.embed()
                .setTitle(`No user found in voice channel`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`Join a voice channel and try again.`)
                .setTimestamp()
            return message.util.send(embed);
        }
        let loading = this.client.util.embed()
            .setTitle(`Loading track...`)
            .setDescription(`_Please wait while I load the track..._`)
            .setTimestamp()
            .setFooter(`Req By: ${message.author.tag}`);
        let playlistRegExp =  /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
        let spotifyPlaylistRegExp = /^(https:\/\/open.spotify.com\/playlist\/|spotify:playlist:)([a-zA-Z0-9]+)(.*)$/;
        if (query.match(spotifyPlaylistRegExp)){
            await message.util.send(loading.setTitle(`Loading Spotify Playlist...`).setDescription(`_Please be patient while I load the playlist, this might take a while..._`));
        } else if(query.match(playlistRegExp)) {
            await message.util.send(loading.setTitle(`Loading Youtube Playlist...`).setDescription(`_Please be patient while I load the playlist, this might take a while..._`));
        } else {
            await message.util.send(loading);
        }
        if (query.match(playlistRegExp)){
            await this.client.player.play(message, query);
        } else {
            await this.client.player.play(message, query, true);
        }

    }
}

module.exports = PlayCommand;