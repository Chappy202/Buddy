const { Command } = require('discord-akairo');
const FiltersList = require('../../assets/json/filters.json');

class FiltersCommand extends Command {
    constructor() {
        super('filters', {
            aliases: ['filters'],
            category: 'Music',
            channel: 'guild',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "filters"
        this.description = "Get the current bot filters"
        this.usage = "filters"
        this.example = "filters"
    }

    async exec(message) {
        const queue = this.client.player.getQueue(message);
        const voice = message.member.voice.channel;
        if (!voice) {
            const embed = this.client.util.embed()
                .setTitle(`No user found in voice channel`)
                .setColor('#f26666')
                .setDescription(`Join a voice channel and try again.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        if (!queue) {
            const embed = this.client.util.embed()
                .setTitle(`No song playing`)
                .setColor('#f26666')
                .setDescription(`No songs are currently playing in this server.`)
                .setTimestamp()
            return message.util.send(embed);
        }

        const filtersStatuses = [ [], [] ];

        Object.keys(FiltersList).forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(FiltersList[filterName] + " : " + (this.client.player.getQueue(message).filters[filterName] ? '✅' : '❌'));
        });

        const list = this.client.util.embed()
            .setDescription(`Here is the list of all filters enabled or disabled.\nUse \`<prefix>filter\` to change the status of one of them.`)
            .addField(`**Filters**`, filtersStatuses[0].join("\n"), true)
            .addField("** **", filtersStatuses[1].join("\n"), true);

        return message.util.send(list);
    }
}

module.exports = FiltersCommand;