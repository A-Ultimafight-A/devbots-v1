const Discord = require('discord.js')
const config = require('../config.json')
var prefix = config.prefix;
var speudo = config.speudo;

module.exports = async (client, message) => {
    console.log(`${client.user.username} est en ligne !`);

        let statuses = [
            "Ultimafight à crée le bot",
            `En ligne sur ${client.guilds.cache.size} serveurs`,
            `${prefix}help pour voir les commandes`
        ]

        setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, {type: "WATCHING"})
    }, 5000)
};