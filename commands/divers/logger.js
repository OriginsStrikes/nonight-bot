const { Command } = require('discord.js-commando');
    
module.exports = class TestLoggerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'logger',
            memberName: 'logger',
            group: 'divers',
            description: 'Test the logger.',
        });
    }

    async run(msg) {
        this.client.logger.log('info', 'Un nouveau membre est là');
        this.client.logger.log('warn', 'Attention !!');
        this.client.logger.log('error', 'Une erreur est survenue :(');
    }
};