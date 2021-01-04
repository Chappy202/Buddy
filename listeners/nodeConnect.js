const { Listener } = require('discord-akairo');

module.exports = class NodeConnect extends Listener {
    constructor() {
        super('nodeConnect', {
            emitter: 'musicHandler',
            event: 'nodeConnect'
        });
    }

    async exec(node) {
        this.client.logger.log('info', `Node "${node.options.identifier}" connected.`);
    }
}