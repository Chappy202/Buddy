const { Listener } = require('discord-akairo');

module.exports = class NodeError extends Listener {
    constructor() {
        super('nodeError', {
            emitter: 'musicHandler',
            event: 'nodeError'
        });
    }

    async exec(node, error) {
        this.client.logger.log('error', `Node "${node.options.identifier}" encountered an error: ${error.message}`);
    }
}