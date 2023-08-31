const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const { prefix, owner, token } = require("./config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const Gamedig = require("gamedig")
client.commands = new Collection()
const mysql = require("mysql");
const fs = require('fs');
const path = require('path');
const os = require('os');
//const archiver = require('archiver');
const nodemailer = require('nodemailer');
//const { google } = require('googleapis');
const rest = new REST({ version: '10' }).setToken(token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'database ismini girin'
});
//command-handler
const commands = [];
const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}
function checkServerStatus() {
    Gamedig.query({
      type: 'mtasa',
      host: 'mta sunucu ip adresini girin',
      port: '22003'
    }).then((state) => {
      if (state.password) {
        client.user.setActivity({ name: `Suncu Bakımda!`, type: ActivityType.Playing })
      } else {
        if(state.players.length > 5){
            client.user.setActivity({ name: `Venom Roleplay'de Şuan ${state.players.length} Kişi Aktif!`, type: ActivityType.Playing })
        } else {
            client.user.setActivity({ name: `Venom Roleplay Şuan Aktif!`, type: ActivityType.Playing })
        }
        console.log('Oyuncu sayısı:', state.players.length);
      }
    }).catch((error) => {
        client.user.setActivity({ name: `Suncu Bakımda!`, type: ActivityType.Playing })
    });
  }
  
  setInterval(checkServerStatus, 30000);
client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} Aktif Edildi!`);
    checkServerStatus();
})

//event-handler
const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
//
connection.connect((error) => {
  if (error) {
    console.log("Mysql bağlantısı başarısız.")
    return;
      
  } else {
      
      client.login(token)
    
  }
})

