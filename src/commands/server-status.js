const { EmbedBuilder, PermissionsBitField, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const Gamedig = require("gamedig")
module.exports = {
    data: new SlashCommandBuilder()
      .setName("sunucu-durumu")
      .setDescription("MTA sunucusunun durumunu görüntüleyin."),
      run: async (client, interaction) => {
        const bakım = new EmbedBuilder()
              .setColor("#2B2D31")
              .setTitle("Sunucu şuanda bakımda!");
              
        fs.access(`./src/database/baglanti/mta-${interaction.user.id}.json`, fs.constants.F_OK, (err) => {
            if (err) {
              const error1 = new EmbedBuilder()
              .setColor("#2B2D31")
              .setTitle("Hiç bir MTA hesabına bağlı değilsiniz.");
              interaction.reply({ contents: [error1], ephemeral: true})
              return;
            }
            Gamedig.query({
                type: 'mtasa',
                host: '185.254.30.157',
                port: '22003'
            }).then((state) => {
                function embedi(){
                    const durums = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .addFields(
                        { name: 'Şifre Durumu', value: "```"+ state.password + "```", inline: true },
                        { name: 'Oyuncu Sayısı', value: "```"+state.players.length+"/"+state.maxplayers+"```", inline: true },
                        { name: 'Ping', value: "```"+ state.ping+ "```", inline: true },
                        { name: 'Sunucu İP', value: '```185.254.30.157:22003```', inline: false },
                        { name: 'Oyuncular', value: "```"+state.players.map(player => player.name).join('\n')+"```", inline: false }
                    )
                    .setTitle("Sunucu şuanda bakımda!");
                    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setURL('https://shorturl.at/stzAU')
					.setLabel('👾Sunucuya Bağlan!')
					.setStyle(ButtonStyle.Link),
			);
            interaction.reply({ embeds: [durums], components: [row], ephemeral: true})
                }
                if(state.password == true){
                    if(interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                        embedi();
                        return;
                    } else {
                        console.log("c2-s")
                        interaction.reply({ embeds: [bakım], ephemeral: true});
                        return; 
                    }
                }else {
                    embedi();
                    return;
                }
            }).catch((error) => {
                console.log("c1-s")
                console.log(error)
                interaction.reply({ embeds: [bakım], ephemeral: true});
                return;
            });
        })
      }
    }