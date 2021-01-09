const { Listener } = require('discord-akairo');

module.exports = class NoResultListener extends Listener {
    constructor() {
        super('noResults', {
            emitter: 'musicHandler',
            event: 'noResults'
        });
    }

    async exec(message, query) {
        let output = this.client.util.embed()
            .setColor(process.env.ERRORCOLOR)
            .setTitle(`Unable to find the search`)
            .setDescription(`I was unable to find results for **${query}**`)
            .setTimestamp()

        return message.util.send(output);
    }
}