const { Listener } = require('discord-akairo');

module.exports = class EmptyChannelListener extends Listener {
    constructor() {
        super('channelEmpty', {
            emitter: 'musicHandler',
            event: 'channelEmpty'
        });
    }

    async exec(message, queue) {
        let output = this.client.util.embed()
            .setColor(process.env.ERRORCOLOR)
            .setTitle(`All users left the voice channel.`)
            .setDescription(`Please join a voice channel in order to listen to music.`)
            .setTimestamp()

        return message.util.send(output);
        /*if (!queue) {
            let output = this.client.util.embed()
                .setColor(`#f26666`)
                .setTitle(`No user found in voice channel`)
                .setDescription(`Please join a voice channel in order to listen to music.`)
                .setTimestamp()

            return message.util.send(output);
        } else {
            this.client.player.pause(message);
            let output = this.client.util.embed()
                .setColor(`#f26666`)
                .setTitle(`No users in the voice channel`)
                .setDescription(`There are still songs on the queue. The song playback has been paused, to resume, use the \`resume\` command.`)
                .setTimestamp()

            return message.util.send(output);
        }*/

    }
}