const { Listener } = require('discord-akairo');

module.exports = class uncaughtExceptionListener extends Listener {
    constructor() {
        super('uncaughtException', {
            emitter: 'process',
            event: 'uncaughtException'
        });
    }

    async exec(error) {
        console.log(error)
            this.client.logger.log('error', `UncaughtException: ${error}`);
    }
}