const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
const mysql = require("mysql")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("hesaba-bağlıyı-bul")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
			option
				.setName('username')
				.setDescription('nagi hesapla bağlı olduğunu öğrenmek istediğiniz MTA Kullanıcı adını giriniz.')
				.setRequired(true))
    .setDescription("Eğer seçtiğiniz kişi MTA hesabı ile discorda bağlandıysa onun bağlantısını siler."),
    run: async (client, interaction) => {
        const kullanıcı = interaction.options.getString("username")
        if (interaction.member.roles.cache.has("1119652508940374078") && interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
            const query = `SELECT * FROM accounts WHERE username = '${kullanıcı}'`;
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'database ismini girin'
              });
              const panel = new EmbedBuilder()
                          .setColor("#2B2D31")
                          .setTitle("Bir hata oluştu lütfen daha sonra deneyiniz.");
                          const hata = new EmbedBuilder()
                          .setColor("#2B2D31")
                          .setTitle("Girdiğiniz kullanıcı adı hatalı.");
            connection.query(query, (error, results) => {
                if (error) {
                    interaction.reply({ embeds: [panel], ephemeral: true});
                    console.log(error)
                        return;
                } else {
                    if (results.length === 0) {
                        interaction.reply({embeds: [hata], ephemeral: true})
                        return;
                    } else {
                        const discord = results[0].discord;
                        if(discord === 0){
                            const panelaaf = new EmbedBuilder()
                            .setColor("#2B2D31")
                            .setTitle("Bu MTA hesabı hiç bir discord hesabına bağlı değil.");
                            interaction.reply( { embeds: [panelaaf], ephemeral: true});
                            return;
                        } else {
                            const dcid = results[0].dcid;
                            if(dcid == null){
                                const panelaaf = new EmbedBuilder()
                            .setColor("#2B2D31")
                            .setTitle("Bu MTA hesabı hiç bir discord hesabına bağlı değil.");
                            interaction.reply( { embeds: [panelaaf], ephemeral: true});
                            return;
                            }else {
                                const panelaaf = new EmbedBuilder()
                                .setColor("#2B2D31")
                                .setDescription(`**${kullanıcı}** Kullanıcı adlı MTA hesabı <@${dcid}> ile eşleştirilmiş.`);
                                interaction.reply( { embeds: [panelaaf], ephemeral: true}); 
                                return;
                            }
                        }
                    }
                }
            })
        } else {
            const yokv = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setDescription(`Bu komutu kullanmaya yetkiniz yetmiyor.`);
                    interaction.reply({ embeds: [yokv], ephemeral: true})
        }
    }
}