const Discord = require('discord.js')

module.exports.run = async(client,message,args) => {

    let ServerEmbed = new Discord.MessageEmbed()
    .setColor('#3b5998')
    .setAuthor(message.guild.name)
    .setThumbnail(message.guild.iconURL({dynamic: true, size: 512}))
    .addField('❱ Nom du serveur', message.guild.name)
    .addField('❱ Propriétaire du serveur', message.guild.owner)
    .addField('❱ Nombre de membres', message.guild.memberCount)
    .addField('❱ Nom de rôle', message.guild.roles.cache.size)
    .setFooter('❱ DevBot\'s est a votre service !')

    message.channel.send(ServerEmbed)
    
}
module.exports.help = {
    name: 'serverinfo',
    category: "utils"
}