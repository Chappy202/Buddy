const { Listener } = require('discord-akairo');

module.exports = class RawListener extends Listener {
    constructor() {
        super('raw', {
            emitter: 'client',
            event: 'raw'
        });
    }

    async exec(d) {
        //console.log('Raw event fired');
        //this.client.manager.updateVoiceState(d);
        /*try {
            if (this.client.manager) {
                this.client.manager.updateVoiceState(d);
            }
        } catch (err) {
            console.log(err)
        }*/
    }
}