const { Command } = require('discord-akairo');

class PlayCommand extends Command {
    constructor() {
        super('play', {
            aliases: ['play', 'p', 'add'],
            category: 'Music',
            channel: 'guild',
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
        await message.util.send(loading);
        if (query.match(playlistRegExp)){
            await this.client.player.play(message, query);
        } else {
            await this.client.player.play(message, query, true);
        }

    }
}

module.exports = PlayCommand;