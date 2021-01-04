const { Command } = require('discord-akairo');

class PlayCommand extends Command {
    constructor() {
        super('play', {
            aliases: ['play', 'p'],
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
        const { channel } = message.member.voice;
        if (!channel) {
            return message.reply('you need to join a voice channel.');
        };

        const player = await this.client.manager.create({
            guild: message.guild.id,
            voiceChannel: channel.id,
            textChannel: message.channel.id
        });

        if (player.state !== "CONNECTED") {
            player.connect();
        }

        let res;
        try {
            res = await player.search(query, message.author);
            if (res.loadType === 'LOAD_FAILED'){
                if (!player.queue.current) {
                    player.destroy();
                    throw res.exception;
                }
            }
        } catch(err) {
            return message.reply(`there was an error while searching: ${err.message}`);
        }

        switch (res.loadType) {
            case 'NO_MATCHES':
                if (!player.queue.current) player.destroy();
                return message.reply('there were no results found.');
            case 'TRACK_LOADED':
                player.queue.add(res.tracks[0]);
                if (!player.playing || !player.paused || !player.queue.size) player.play();
                return message.reply(`enqueuing \`${res.tracks[0].title}\`.`);
            case 'PLAYLIST_LOADED':
                player.queue.add(res.tracks);
                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                return message.reply(`enqueuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`);
            case 'SEARCH_RESULT':
                let max = 5, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
                if (res.tracks.length < max) max = res.tracks.length;

                const results = res.tracks
                    .slice(0, max)
                    .map((track, index) => `${++index} - \`${track.title}\``)
                    .join('\n');

                message.channel.send(results);

                try {
                    collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
                } catch (e) {
                    if (!player.queue.current) player.destroy();
                    return message.reply("you didn't provide a selection.");
                }

                const first = collected.first().content;

                if (first.toLowerCase() === 'end') {
                    if (!player.queue.current) player.destroy();
                    return message.channel.send('Cancelled selection.');
                }

                const index = Number(first) - 1;
                if (index < 0 || index > max - 1) return message.reply(`the number you provided too small or too big (1-${max}).`);

                const track = res.tracks[index];
                player.queue.add(track);

                if (!player.playing && !player.paused && !player.queue.size) player.play();
                return message.reply(`enqueuing \`${track.title}\`.`);
        }
    }
}

module.exports = PlayCommand;