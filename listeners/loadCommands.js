const { Listener } = require('discord-akairo');

module.exports = class loadListener extends Listener {
    constructor() {
        super('load', {
            emitter: 'commandHandler',
            event: 'load'
        });
    }

    async exec(command, isReload) {
        if (isReload){
            this.client.logger.log('info', `Successfully reloaded command \x1b[32m${command.categoryID}/${command.id}\x1b[0m`);
        } else {
            this.client.logger.log('info', `Successfully loaded command \x1b[32m${command.categoryID}/${command.id}\x1b[0m`);
        }
    }
}