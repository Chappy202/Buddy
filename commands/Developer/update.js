const { Command } = require('discord-akairo');

class UpdateCommand extends Command {
    constructor() {
        super('update', {
            aliases: ['update'],
            ownerOnly: true,
            category: 'Developer'
        });
        this.description = "Updates the bot and all modules"
        this.usage = 'update'
        this.example = 'update'
        this.name = "update"
    }

    async exec(message) {
        let embed = this.client.util.embed()
            .setTitle(`Updating Buddy...`)
            .setDescription(`\`Stage 1.\` **Update started...**`)
            .setTimestamp();
        let m = await message.util.send(embed);
        m = await m.edit(embed.setDescription(`\`Stage 2.\` Unloading and Loading all \`Inhibitors\` now.`));
        await this.client.inhibitorHandler.removeAll();
        await this.client.inhibitorHandler.loadAll()
        m = await m.edit(embed.setDescription(`\`Stage 3.\` Unloading and Loading all \`Listeners\` now.`));
        await this.client.listenerHandler.removeAll()
        await this.client.listenerHandler.loadAll()
        m = await m.edit(embed.setDescription(`\`Stage 4.\` Unloading and Loading all \`Commands\` now.`));
        await this.client.commandHandler.removeAll()
        await this.client.commandHandler.loadAll()
        m = await m.edit(embed.setDescription(`\`Stage 5 - final.\` Reloading \`everything\` now.`));
        await this.client.inhibitorHandler.reloadAll()
        await this.client.listenerHandler.reloadAll()
        await this.client.commandHandler.reloadAll()
        return m = await m.edit(embed.setDescription(`\`Done!\` **Update Complete**`).setFooter(`Update is finished.`));
    }

}

module.exports = UpdateCommand;