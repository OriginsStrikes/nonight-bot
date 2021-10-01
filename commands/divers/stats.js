const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            memberName: 'stats',
            group: 'divers',
            description: 'Affiche le nombre de serveurs Discord où est présent le bot.',
        });
    }

    async run(msg) {
        const embed = new Discord.MessageEmbed()
            .setDescription(`Je suis présent sur **${this.client.guilds.cache.size} serveur(s)** :heart:`)
            .setColor('BLUE')
        ;

        return msg.say(embed);
    }
};