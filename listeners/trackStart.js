const { Listener } = require('discord-akairo');

module.exports = class trackStart extends Listener {
    constructor() {
        super('trackStart', {
            emitter: 'musicHandler',
            event: 'trackStart'
        });
    }

    async exec(player, track) {
        const channel = this.client.channels.cache.get(player.textChannel);
        channel.send(`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\``);
    }
}