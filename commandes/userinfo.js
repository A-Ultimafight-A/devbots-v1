const Discord = require('discord.js')

module.exports.run = async(client,message,args) => {

        let UserEmbed = new Discord.MessageEmbed()
        .setColor('#3b5998')
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        .addField('❱ Nom de l\'utilisateur', `${message.author.username}`)
        .addField('❱ Hashtag', message.author.discriminator)
        .addField('❱ ID', message.author.id)
        .addField('❱ Status', message.author.presence.status)
        .addField('❱ Votre compte a été crée le', message.author.createdAt)
        .setFooter('❱ DevBot\'s est a votre service !')

        message.channel.send(UserEmbed)

}

module.exports.help = {
    name: 'userinfo',
    category: "utils"
}