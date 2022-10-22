const Discord = require('discord.js');
const client = new Discord.Client();
var request = require('request');

client.on('message', message => {
    if (message.content.startsWith('!find')) {
        const args = message.content.split(' ')

        if (!args[1]) return message.channel.send(`takiego ip nie ma w bazie danych`)

        const url = "https://xrxxxx.github.io/marcin-glod/" + args[1]
	    request(url, function(err, response, body) {
            if (err) {
                console.log(err);
                return message.channel.send(`Request error (look at the console)`);
            }
            
            body = JSON.parse(body);

            if (body) {
                if (body.online === true) {
                    const embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(args[1])
                        .addField('IP', body.ip, false)
                        .setTimestamp()
                    message.channel.send(embed)
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(args[1])
                        .setDescription("Server jest offline !")
                        .setTimestamp()
                    message.channel.send(embed)
                }
            }
        })
    }
})

client.login('TOKEN BOTA');
