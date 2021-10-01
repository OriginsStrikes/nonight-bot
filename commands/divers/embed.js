const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'embed',
            memberName: 'embed',
            group: 'divers',
            description: 'Send an embed message.',
            ownerOnly: true,
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'], // le bot doit avoir la permission d'envoyer des messages
            throttling: {
                usages: 2,
                duration: 10,
            },
        });
    }

    async run(msg) {
        const embed = new Discord.MessageEmbed(); // création de l'embed

        embed
            .setColor(`BLUE`) // ou .setColor(`#0099ff`)
            .setTitle(`Titre du message, maximum 256 caractères`)

            // .setAuthor(`Nom de l'auteur`, `https://mtxserv.com/build/img/favicon/favicon.ico`, `https://mtxserv.com/fr/`)
            .setAuthor(`${this.client.user.tag}`, `${this.client.user.displayAvatarURL()}`, 'https://discord.gg/SyRy936NSk')

            .setDescription(`Message contenu dans l'embed, maximum 2048 caractères`)
            .setFooter(`Pied de page du message`, `${this.client.user.displayAvatarURL()}`)

            .setImage(`https://cdn.discordapp.com/attachments/854790813355475004/893294771815194634/depositphotos_20044719-stock-photo-beautiful-night.jpg`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/854790813355475004/893294771815194634/depositphotos_20044719-stock-photo-beautiful-night.jpg`)

            .setTimestamp() // Vous pouvez passer un objet Date() en argument

            // Fields

            // Sur une ligne complète :
            .addField(`Titre, maximum 256 caractères`,`Votre texte, maximum 1024 caractères`)

            // Plusieurs sur une même ligne :
            .addField(`Titre 1`,`Votre texte 1`, true)
            .addField(`Titre 2`,`Text avec un [lien](https://discord.gg/SyRy936NSk)`, true)
        ;

        msg.say(embed)
    }
};