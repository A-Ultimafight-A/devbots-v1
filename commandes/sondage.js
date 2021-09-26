const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

    const {
        color,
        colorError
    } = require('../config.json');


    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) {
        const notpermer = new Discord.MessageEmbed();
        notpermer.setTitle('❌・__Erreur__')
        notpermer.setColor(colorError)
        notpermer.setDescription(`Vous n'avez pas la permission de créer un sondage`)
        return message.channel.send(notpermer)
    }

    if (!args[0]) {
        const notmentions = new Discord.MessageEmbed();
        notmentions.setTitle('❌・__Erreur__')
        notmentions.setColor(colorError)
        notmentions.setDescription(`Vous n'avez pas donné la nature du sondage.`)
        return message.channel.send(notmentions)
    }

    const sondageslice = args.join(' ');

    const embed = new Discord.MessageEmbed()
    embed.setTitle(`📊・__Nouveau Sondage__`)
    embed.setColor(color)
    embed.setDescription(`**${sondageslice}**` + "\n\n✅ Oui.\n\n ❌ Non.") 
    embed.setFooter(`❱ DevBot's à votre service !`)
    message.channel.send(embed).then(function (message) {
        message.react("✅")
        message.react("❌")
    }).catch(function () {});
}
module.exports.help = {
    name: 'sondage',
    category: "utils"
}
