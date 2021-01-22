const { Listener } = require('discord-akairo');

module.exports = class PlaylistAddListener extends Listener {
    constructor() {
        super('playlistAdd', {
            emitter: 'musicHandler',
            event: 'playlistAdd'
        });
    }

    async exec(message, queue, playlist) {
        let output = this.client.util.embed()
            .setColor(process.env.BASECOLOR)
            .setTitle(`${playlist.title} Added to the queue.`)
            .setDescription(`**${playlist.tracks.length}** Songs Have been added to the server queue.`)
            .setTimestamp()


        return message.util.send(output);
    }
}