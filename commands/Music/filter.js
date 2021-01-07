const { Command } = require('discord-akairo');
const FiltersList = require('../../assets/json/filters.json');

class FilterCommand extends Command {
    constructor() {
        super('filter', {
            aliases: ['filter'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            * args() {
                const query = yield {
                    match: "content",
                    prompt: {
                        start: (msg, text) =>
                            `What filter would you like to enable or disable?`
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
        this.name = "filter"
        this.description = "Enable or disable a filter"
        this.usage = "filter <filter>"
        this.example = "filter bassboost"
    }

    async exec(message, { query }) {
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

        const filter = query;
        //console.log(filter)
        if (!filter) {
            const embed = this.client.util.embed()
                .setTitle(`No filter specified`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`Please specify a valid filter to enable or disable! (or send \`<prefix>filters\` to get the statuses of the filters)`)
                .setTimestamp()
            return message.util.send(embed);
        }

        const filterToUpdate = Object.values(FiltersList).find((f) => f.toLowerCase() === filter.toLowerCase());

        if (!filterToUpdate) {
            const embed = this.client.util.embed()
                .setTitle(`Unknown Filter`)
                .setColor(process.env.ERRORCOLOR)
                .setDescription(`This filter doesn't exist! Send \`<prefix>filters\` to get the list!`)
                .setTimestamp()
            return message.util.send(embed);
        }

        const filterRealName = Object.keys(FiltersList).find((f) => FiltersList[f] === filterToUpdate);
        const queueFilters = this.client.player.getQueue(message).filters;
        const filtersUpdated = {};
        filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
        await this.client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterRealName]){
            const embed = this.client.util.embed()
                .setTitle(`Adding Filter`)
                .setDescription(`I'm adding the filter to the music, please wait... Note: the shorter the music, the faster it will be.`)
                .setTimestamp()
                .setFooter(`Req by: ${message.author.tag}`);
            return message.util.send(embed);
        } else {
            const embed = this.client.util.embed()
                .setTitle(`Removing Filter`)
                .setDescription(`I'm removing the filter to the music, please wait... Note: the shorter the music, the faster it will be.`)
                .setTimestamp()
                .setFooter(`Req by: ${message.author.tag}`);
            return message.util.send(embed);
        }
    }
}

module.exports = FilterCommand;