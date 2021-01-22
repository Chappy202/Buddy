const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');

module.exports = function() {
    let mod = require(path.join(__dirname, 'module.js'));
    let commands = fs.readdirSync(__dirname);
    let col = new Discord.Collection();
    let cmdDetail = new Discord.Collection();
    col[mod.name] = [];
    commands.forEach(cmd => {
        if (!cmd.endsWith('.js')) return;
        let beta = require(path.join(__dirname, `${cmd}`));
        if (beta === true) return;
        let command = new (require(path.join(__dirname, `${cmd}`)));
        let name = command.name;
        let aliases = command.aliases.map(x => `\`${x}\``);
        let description = command.description;
        let cmdUsage = command.usage;
        let cmdEx = command.example;
        col[mod.name].push(`\`${name}\``);
        if (!command.aliases === aliases) return;
        else if (!command.description === description) return;
        else if (!command.example === cmdEx) return;
        else if (!command.usage === cmdUsage) return;
        let detail = {
            name: name,
            description: description,
            aliases: aliases,
            example: cmdEx,
            usage: cmdUsage
        };
        command.aliases.forEach(x => {
            cmdDetail[x] = detail
        });
    });
    console.log(col[mod.name].join(' - '))
    return col[mod.name].join(' - ');
}