    
    const Discord = require('discord.js');
    const { REFUSED } = require('dns');
        const fs = require('fs');
        const client = new Discord.Client({
            disableEveryone: true,
        });
    
        client.commands = new Discord.Collection();
        const config = require('./config.json');
        
        ["commands", "cooldowns"].forEach(x => client[x] = new Collection());
    
        fs.readdir("./commandes/", (error, f) => {
            if (error) console.log(error);
            let Commandes = f.filter(f => f.split(".").pop() === "js");
            if (Commandes.length <= 0) return console.log("Aucune commande trouvé !");
            Commandes.forEach((f) => {
                let commande = require(`./commandes/${f}`);
                console.log(`${f} commande chargée !`);
                client.commands.set(commande.help.name, commande);
            });
        });

        client.on('message', message => {
            if (!message.content.startsWith(PREFIX) || message.author.bot) return;
            const args = message.content.slice(PREFIX.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const user = message.mentions.users.first();
          
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
            if (!command) return;
          
            if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("Tu n'as pas les perms");
          
            if (command.help.args && !args.length) {
              let noArgsReply = `Il faut des arguments pour cette commande ${message.author}`;
          
              if (command.help.usage) noArgsReply += `\nUtilisation de la commande: \`${PREFIX}${command.help.name} ${command.help.usage}\``;
          
              return message.channel.send(noArgsReply);
            };
          
            if (command.help.isUserAdmin && !user) return message.reply('Il faut mentionner un utilisateur');
          
            if (command.help.isUserAdmin && message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply("Tu n'as pas les perms sur lui");
          
            if (!client.cooldowns.has(command.help.name)) {
              client.cooldowns.set(command.help.name, new Collection());
            };
          
            const timeNow = Date.now();
            const tStamps = client.cooldowns.get(command.help.name);
            const cdAmount = (command.help.cooldown || 5) * 1000;
          
            if (tStamps.has(message.author.id)) {
              const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
          
              if (timeNow < cdExpirationTime) {
                timeLeft = (cdExpirationTime - timeNow) / 1000;
                return message.reply(`Attendez ${timeLeft.toFixed(0)} seconde(s) avant de réutiliser \`${command.help.name}\`.`);
              }
            }
          
            tStamps.set(message.author.id, timeNow);
            setTimeout(() => tStamps.delete(message.author.id), cdAmount);
          
            command.run(client, message, args);
          });
    
        fs.readdir('./events/', (error, f) => {
            if (error) { return console.error(error); }
                console.log(`${f.length} events chargés`);
        
                f.forEach((f) => {
                    let events = require(`./events/${f}`);
                    let event = f.split('.')[0];
                    client.on(event, events.bind(null, client));
                });
        });


client.login(config.token);