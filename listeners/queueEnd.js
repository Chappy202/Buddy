const { Listener } = require('discord-akairo');

module.exports = class QueueEnd extends Listener {
    constructor() {
        super('queueEnd', {
            emitter: 'musicHandler',
            event: 'queueEnd'
        });
    }

    async exec(player) {
        const channel = this.client.channels.cache.get(player.textChannel);
        channel.send(`The queue has ended.`);
        player.destroy();
    }
}