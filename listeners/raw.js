const { Listener } = require('discord-akairo');

module.exports = class RawListener extends Listener {
    constructor() {
        super('raw', {
            emitter: 'client',
            event: 'raw'
        });
    }

    async exec(d) {
        this.client.manager.updateVoiceState(d);
    }
}