const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    const {
        colorError,
        colorSucces
    } = require('../config.json');


    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
        const notpermm = new Discord.MessageEmbed()
        notpermm.setTitle('> __Erreur__')
        notpermm.setColor(colorError)
        notpermm.setDescription(`<a:non:860930783974785055>・Vous n'avez pas la permission de supprimer des messages`)
        return message.channel.send(notpermm)
    }

    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
        const paperm = new Discord.MessageEmbed()
        paperm.setTitle('> __Erreur__')
        paperm.setColor(colorError)
        paperm.setDescription(`<a:non:860930783974785055>・Vous ne m'avez pas accordé la permission de supprimer des messages`)
        return message.channel.send(paperm)
    }

    if (!args[0]) {
        const msgsupp = new Discord.MessageEmbed()
        msgsupp.setTitle('> __Erreur__')
        msgsupp.setColor(colorError)
        msgsupp.setDescription(`<a:non:860930783974785055>・Vous n'avez pas indiqué le nombre de message(s) à supprimer`)
        return message.channel.send(msgsupp)
    }

    if (isNaN(args[0])) {
        const msglettre = new Discord.MessageEmbed()
        msglettre.setTitle('> __Erreur__')
        msglettre.setColor(colorError)
        msglettre.setDescription(`<a:non:860930783974785055>・Vous n'avez pas indiqué une valeur acceptable`)
        return message.channel.send(msglettre)
    }

    if (args[0] > 100 || args[0] < 1) {
        const msglimit = new Discord.MessageEmbed()
        msglimit.setTitle('> __Erreur__')
        msglimit.setColor(colorError)
        msglimit.setDescription(`<a:non:860930783974785055>・Je n'ai pas la chance de supprimer plus de 100 messages (ou moins que 1)`)
        return message.channel.send(msglimit)
    }

    await message.channel.bulkDelete(args[0]);

    const embeded = new Discord.MessageEmbed()
    embeded.setTitle(`> __Succès__`)
    embeded.setDescription(`<a:oui:860930784180699156>・${args[0]} Message(s) ont été supprimé(s)`)
    embeded.setFooter(`Par : ${message.author.tag}`)
    embeded.setColor(colorSucces)
    message.channel.send(embeded)
}
module.exports.help = {
    name: "clear",
    category: "mod"
}