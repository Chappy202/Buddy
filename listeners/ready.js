const { Listener } = require('discord-akairo');
const config = require('../config.js');

module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        this.client.logger.log('info', `${this.client.user.tag} is ready to Rumble!!`);

        // Set first time activity before interval
        const index = Math.floor(Math.random() * (this.client.config.activities_list.length - 1) + 1);
        let activity = this.client.config.activities_list[index].split("|");
        this.client.user.setActivity(`${activity[1]}`, {
            type: `${activity[0]}`
        });

        // Change activity every 30 seconds
        setInterval(() => {
            const index = Math.floor(Math.random() * (this.client.config.activities_list.length - 1) + 1);
            let activity = this.client.config.activities_list[index].split("|");
            this.client.user.setActivity(`${activity[1]}`, {
                type: `${activity[0]}`
            });
        }, 30000);

        this.client.config
        /*const nodes = [...this.client.manager.nodes.values()];
        for (const node of nodes){
            try {
                await node.connect();
            } catch (e) {
                this.client.manager.emit('error', e, node);
            }
        }*/
    }
}