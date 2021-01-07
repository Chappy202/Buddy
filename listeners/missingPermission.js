const { Listener } = require('discord-akairo');

module.exports = class missingPermissionListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    async exec(message, command, type, missing) {
        let embed = this.client.util.embed()
            .setColor(process.env.ERRORCOLOR)
            .setTitle('Mission permission')
            .setDescription(`I do not have the required permissions for ${command.id}!`)
            .addField('Missing permission:', missing)
            .setTimestamp();

        switch (type) {
            case 'client':
                if (missing == 'SEND_MESSAGES') {
                    return;
                } else {
                    message.reply(embed);
                }
                break;
            case 'user':
                if (missing == 'SEND_MESSAGES') {
                    embed.setDescription(`You are missing the required permissions for the ${command.id} command!`);
                    return message.author.send(embed);
                } else {
                    embed.setDescription(`You are missing the required permissions for the ${command.id} command!`);
                    message.reply(embed);
                }
                break;
        }
    }
}