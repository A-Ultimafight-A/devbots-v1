const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    const {
        colorError,
        colorSucces
    } = require('../config.json');

    const embeded = new Discord.MessageEmbed()
    embeded.setTitle(`> __Ajoute moi !__`)
    embeded.setDescription(`<a:oui:860930784180699156>・https://discord.com/oauth2/authorize?client_id=843196499663388804&scope=bot&permissions=8`)
    embeded.setFooter(`❱ DevBot's à votre service !`)
    embeded.setColor(colorSucces)
    message.channel.send(embeded)
}
module.exports.help = {
    name: "addme",
    category: "fun"
}