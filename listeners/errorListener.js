const { Listener } = require('discord-akairo');

module.exports = class errorListener extends Listener {
    constructor() {
        super('error', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    async exec(error, message, command) {
        this.client.logger.log('error', `Something went wrong on ${command.id} | Error: ${error} | On the message: ${message}`);
    }
}