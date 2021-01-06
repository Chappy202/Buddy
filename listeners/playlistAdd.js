const { Listener } = require('discord-akairo');

module.exports = class PlaylistAddListener extends Listener {
    constructor() {
        super('playlistAdd', {
            emitter: 'musicHandler',
            event: 'playlistAdd'
        });
    }

    async exec(message, queue, playlist) {
        console.log(playlist)
        /*let output = this.client.util.embed()
            .setColor(process.env.BASECOLOR)
            .setTitle(`The queue is empty`)
            .setDescription(`Add more songs to resume playback.`)
            .setTimestamp()

        return message.util.send(output);*/
    }
}