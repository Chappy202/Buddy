const { Command } = require('discord-akairo');

class AnimeCommand extends Command {
    constructor() {
        super('anime', {
            aliases: ['anime', 'anim'],
            category: 'Information',
            * args() {
                const query = yield {
                    match: "content",
                    prompt: {
                        start: (msg, text) =>
                            `What anime do you want info on?`
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
        this.name = "anime"
        this.description = "Get information on the specified anime."
        this.usage = "anime <anime>"
        this.example = "anime Attack on Titan"
    }

    async exec(message, { query }) {
        if (!query) {
            const embed = this.client.util.embed()
                .setTitle(`No anime specified`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`Please provide an anime name or search term.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        let embed = this.client.util.embed()
            .setTitle(`Loading...`)
            .setDescription(`Loading info for \`${query}\`...`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);

        let m = await message.util.send(embed);

        this.client.anime.getInfoFromName(query).then((data) => {
            //console.log(data)
            embed = this.client.util.embed()
                .setTitle(`${data.englishTitle ? data.englishTitle : data.title} | ${data.japaneseTitle}`)
                .setURL(data.url)
                .setThumbnail(data.picture)
                .setDescription(data.synopsis)
                .addField(`Episodes`, data.episodes, true)
                .addField(`Aired`, data.aired, true)
                .addField(`Premiered`, data.premiered, true)
                .addField(`Broadcast`, data.broadcast, true)
                .addField(`${(data.studios.length > 1) ? 'Studios' : 'Studio'}`, `${(data.studios.length > 1) ? data.studios.join(' - ') : data.studios[0]}`, true)
                .addField(`Avg Duration`, data.duration, true)
                .addField(`${(data.genres.length > 1) ? 'Genres' : 'Genre'}`, `${(data.genres.length > 1) ? data.genres.join(' - ') : data.genres[0]}`, true)
                .addField(`Status`, data.status, true)
                .addField(`Rating`, data.rating, true)
                .addField(`Score`, data.score, true)
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp()
            message.util.send(embed);
            return message.util.sendNew('**Trailer:** ' + data.trailer);

        }).catch((err) => {
            console.log(err);
        })
    }
}

module.exports = AnimeCommand;