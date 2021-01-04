const { Listener } = require('discord-akairo');
const config = require('../config.js');
const child_process = require('child_process');
const path = require('path');

module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        /*child_process.exec(path.join(__dirname, '..', 'lavalink/startServer.bat'), function (error, stdout, stderr){
            console.log(stdout);
        })*/
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
        await this.client.voice.connect();
        this.client.manager.init(this.client.user.id);
    }
}