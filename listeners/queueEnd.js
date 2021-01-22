const { Listener } = require('discord-akairo');

module.exports = class QueueEndListener extends Listener {
    constructor() {
        super('queueEnd', {
            emitter: 'musicHandler',
            event: 'queueEnd'
        });
    }

    async exec(message, queue) {
        let output = this.client.util.embed()
            .setColor(process.env.BASECOLOR)
            .setTitle(`The queue is empty`)
            .setDescription(`Add more songs to resume playback.`)
            .setTimestamp()

        return message.util.sendNew(output);
    }
}