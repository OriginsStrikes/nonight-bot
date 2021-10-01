const { Command } = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class SetModeratorCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'set-moderator',
            group: 'admin', // on utilise le nouveau groupe 'admin'
            memberName: 'set-moderator',
            description: 'Ajoute le role Assistant des Développeurs Discord a tous les channels, et force les permissions.',
            ownerOnly: true, // owner only
            guildOnly: true // uniquement dans un channel, pas de DM pour cette commande
        });
    }

    async run(msg) {
        const hasRoleModerator = msg.guild.roles.cache.some(role => role.name === 'Assistant des Développeurs Discord'); // Adaptez le nom si vous changez le nom du rôle modérateur
        if (!hasRoleModerator) {
            this.client.logger.log('error', `Role 'Assistant des Développeurs Discord' non trouvé sur ce serveur.`);
            return;
        }

        const roleModerator = msg.guild.roles.cache
            .filter(role => role.name === 'Assistant des Développeurs Discord')
            .first();

        msg.guild.channels.cache.map(channel => {
            this.client.logger.log('info', `Role 'Assistant des Développeurs Discord' ajouté sur ${channel.name}.`);

            // On surcharge les permissions du rôle 'Modérateur' sur chaque channel du serveur :
            channel.createOverwrite(
                roleModerator.id,
                {
                    ADD_REACTIONS: true, // ajouter des réactions
                    KICK_MEMBERS: true, // kick un membre
                    BAN_MEMBERS: true, // ban un membre
                    VIEW_AUDIT_LOG: true, // voir les audits
                    VIEW_CHANNEL: true, // voir tous les channels
                    READ_MESSAGES: true, // voir les nouveaux messages
                    SEND_MESSAGES: true, // envoyer des messages
                    SEND_TTS_MESSAGES: false, // envoyer des message TTS
                    MANAGE_MESSAGES: true, // peuvent modérer les messages
                    EMBED_LINKS: true, // envoyer des liens sous format intégré
                    ATTACH_FILES: true, // envoyer des fichiers
                    READ_MESSAGE_HISTORY: true, // voir les anciens messages
                    MENTION_EVERYONE: false, // peut mentionner @everyone
                    USE_EXTERNAL_EMOJIS: true,
                    EXTERNAL_EMOJIS: true,
                    SPEAK: true,
                    CONNECT: true,
                    MUTE_MEMBERS: true,
                    DEAFEN_MEMBERS: true,
                    MOVE_MEMBERS: true,
                    USE_VAD: true,
                    CHANGE_NICKNAME: true,
                    MANAGE_NICKNAMES: true,
                }
            );
        });

        const embed = new Discord.MessageEmbed()
            .setDescription(`Mise à jour des permissions pour le role ${roleModerator.name}.`)
            .setColor('GREEN')
        ;

        return msg.say(embed);
    }
};