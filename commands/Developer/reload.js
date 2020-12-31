const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'refresh'],
            ownerOnly: true,
            args: [{
                id: 'ArgOne',
                type: 'string',
                //default: 'bitcoin'
            }],
            category: 'Developer'
        });
        this.description = "Reload a specific module, or all modules."
        this.usage = 'reload <all|command>'
        this.example = 'reload help'
        this.name = "reload"
    }

    async exec(message, args) {
        if (args.ArgOne === null) {
            let output = new Discord.MessageEmbed()
                .setColor('#f26666')
                .setTitle(`No argument provided`)
                .setDescription(`**Possible arguments:** all, [command name]`)
                .setTimestamp()

            return message.util.send(output);
        } else if (args.ArgOne === 'all') {
            this.handler.reloadAll();
            let output = new Discord.MessageEmbed()
                .setColor(process.env.BASECOLOR)
                .setTitle(`Reloaded all Modules`)
                .setDescription(`**Reloaded Commands:** ${this.handler.modules.size}`)
                .setTimestamp()

            return message.util.send(output);
        } else {
            let exist = false;
            if (this.handler.modules.get(args.ArgOne)) {
                this.handler.reload(args.ArgOne);
                let output = new Discord.MessageEmbed()
                    .setColor(process.env.BASECOLOR)
                    .setTitle(`Reloaded ${args.ArgOne}`)
                    .setDescription(`**Successfully reloaded the command:** \`${args.ArgOne}\``)
                    .setTimestamp()

                return message.util.send(output);
            } else {
                let output = new Discord.MessageEmbed()
                    .setColor('#f26666')
                    .setTitle(`Failed to find module`)
                    .setDescription(`Could not find the command \`${args.ArgOne}\`, make sure that you entered the name correctly.`)
                    .setTimestamp()

                return message.util.send(output);
            }
        }
    }

}

module.exports = ReloadCommand;