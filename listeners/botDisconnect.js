const { Listener } = require('discord-akairo');

module.exports = class BotDisconnectListener extends Listener {
    constructor() {
        super('botDisconnect', {
            emitter: 'musicHandler',
            event: 'botDisconnect'
        });
    }

    async exec(message) {
        let output = this.client.util.embed()
            .setColor(process.env.BASECOLOR)
            .setTitle(`Left Voice Channel`)
            .setDescription(`Music playback has stopped, and the queue is empty.`)
            .setTimestamp()

        return message.util.send(output);
    }
}