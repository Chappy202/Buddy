const { Listener } = require('discord-akairo');

module.exports = class unhandledRejectionListener extends Listener {
    constructor() {
        super('unhandledRejection', {
            emitter: 'process',
            event: 'unhandledRejection'
        });
    }

    async exec(error) {
            this.client.logger.log('error', `Uncaught Promise Rejection: ${error}`);
    }
}