const { Listener } = require('discord-akairo');

module.exports = class TrackAddListener extends Listener {
    constructor() {
        super('trackAdd', {
            emitter: 'musicHandler',
            event: 'trackAdd'
        });
    }

    async exec(message, queue, track) {
        let output = this.client.util.embed()
            .setColor(process.env.BASECOLOR)
            .setTitle(`Added ➤ ${track.title}`)
            .setURL(`${track.url}`)
            .setThumbnail(`${track.thumbnail}`)
            .setDescription(`Duration: **${track.duration}**\nAuthor: **${track.author}**\nViews\\Streams: **${track.views}**`)
            .setFooter(`Req by: ${(track.requestedBy.tag) ? track.requestedBy.tag : 'Unknown'}`)
            .setTimestamp()

        return message.util.send(output);
    }
}