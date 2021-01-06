const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

class LyricsCommand extends Command {
    constructor() {
        super('lyrics', {
            aliases: ['lyrics'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            * args() {
                const query = yield {
                    match: "content",
                    prompt: {
                        start: (msg, text) =>
                            `What song would you like lyrics for?`
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
        this.name = "lyrics"
        this.description = "Get the lyrics of a specific song"
        this.usage = "lyrics <song>"
        this.example = "lyrics ed sheeran - perfect"
    }

    async exec(message, { query }) {
        if (!query){
            const embed = this.client.util.embed()
                .setTitle(`No song specified`)
                .setColor(`#f26666`)
                .setDescription(`Please provide a song name`)
                .setTimestamp()
            return message.util.send(embed);
        }

        const embed = this.client.util.embed()
            .setTitle(`🎤 ${query} lyrics`)
            .setFooter(`Req by: ${message.author.tag}`)

        try {
            const songNameFormatted = query
                .toLowerCase()
                .replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "")
                .split(" ").join("%20")

            const m = await message.util.send(embed.setDescription(`Loading... :hourglass:`))

            let res = await fetch(`https://www.musixmatch.com/search/${songNameFormatted}`);
            res = await res.text();
            let $ = await cheerio.load(res);
            const songLink = `https://musixmatch.com${$("h2[class=\"media-card-title\"]").find("a").attr("href")}`;
            res = await fetch(songLink);
            res = await res.text();
            $ = await cheerio.load(res);
            let lyrics = await $("p[class=\"mxm-lyrics__content \"]").text();

            if(lyrics.length > 2048) {
                lyrics = lyrics.substr(0, 2031) + `\n**And more...**` + " [Click here]"+`https://www.musixmatch.com/search/${songName}`;
            } else if(!lyrics.length) {
                const em = this.client.util.embed()
                    .setTitle(`No lyrics found`)
                    .setColor('#f26666')
                    .setDescription(`I couldn't find any lyrics for \`${query}\``)
                    .setTimestamp()
                return m.edit(em);
            }

            embed.setDescription(lyrics);
            return m.edit(embed);
        } catch(e) {
            const em = this.client.util.embed()
                .setTitle(`No lyrics found`)
                .setColor('#f26666')
                .setDescription(`I couldn't find any lyrics for \`${query}\``)
                .setTimestamp()
            return message.util.send(em);
        }
    }
}

module.exports = LyricsCommand;