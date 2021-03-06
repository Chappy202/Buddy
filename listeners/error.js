const { Listener } = require('discord-akairo');

module.exports = class RawListener extends Listener {
    constructor() {
        super('errorMusic', {
            emitter: 'musicHandler',
            event: 'error'
        });
    }

    async exec(error, message) {
        this.client.logger.log('error', `musicHandler Error: ${error}`);
        let output = this.client.util.embed()
            .setColor(`#f26666`)
            .setTitle(`Something went wrong`)
            .setDescription(`Error: ${error}`)
            .setTimestamp()

        return message.util.send(output);
    }
}