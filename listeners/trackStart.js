const { Listener } = require('discord-akairo');

module.exports = class TrackStartListener extends Listener {
    constructor() {
        super('trackStart', {
            emitter: 'musicHandler',
            event: 'trackStart'
        });
    }

    async exec(message, track) {
        //console.log(track)
        let output = this.client.util.embed()
            .setColor(process.env.BASECOLOR)
            .setTitle(`Playing ➤ ${track.title}`)
            .setURL(`${track.url}`)
            .setThumbnail(`${track.thumbnail}`)
            .setDescription(`Duration: **${track.duration}**\nAuthor: **${track.author}**\nViews\\Streams: **${track.views}**`)
            .setFooter(`Req by: ${(track.requestedBy.tag) ? track.requestedBy.tag : 'Unknown'}`)
            .setTimestamp()

        return message.util.send(output);
    }
}