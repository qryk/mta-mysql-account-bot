const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
const mysql = require("mysql")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("hesabın-verisini-gör")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
			option
				.setName('username')
				.setDescription('Verileri görülecek kullanıcı.')
				.setRequired(true))
    .setDescription("Girdiğiniz kullanıcının hesap verilerini görüntüleyin."),
    run: async (client, interaction) => {
        const kullanıcı = interaction.options.getString("username")
        if (interaction.user.id == "1017171430019960904" || interaction.user.id == "185367033922322432"){
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
                        const unid = results[0].id;
                        const email = results[0].email
                        const bakiye = results[0].balance
                        const sgiriş = results[0].registerdate
                        connection.query('SELECT charactername FROM characters WHERE account = '+ unid +'', (error, results, fields) => {
                            if (error) {
                              console.error(error);
                            } else {
                              console.log(`${results.length} results found.`);
                              let characternames = "";
                              for (let i = 0; i < results.length; i++) {
                                characternames += results[i].charactername + "\n";
                              }
            
                              const row = new ActionRowBuilder()
                                .addComponents(
                                  new ButtonBuilder()
                                    .setCustomId('kveri')
                                    .setLabel('Karakter Verisi Gör!')
                                    .setStyle(ButtonStyle.Danger),
                                );
            
            
                              const embed = new EmbedBuilder()
                              .setColor("#2B2D31")  
                              .setTitle(`Merhabalar, ${kullanıcı} kullanıcı adlı hesabın verileri şu şekilde:`)
                              
                              .addFields(
                                { name: 'Kayıt Tarihi', value: '```'+ sgiriş +'```', inline: true },
                                { name: 'Hesap Bakiyesi', value: '```'+ bakiye +'```', inline: true },
                                { name: 'Karakter Sayısı', value: '```'+ results.length +'```', inline: true },
                                { name: 'Karakterleri: \n', value: '`'+ characternames +'`', inline: false },
                                
                              );
            
                                kid = interaction.user.id;
                                
            
                                console.log(characternames)
            
            
            
                              interaction.reply({ embeds: [embed], ephemeral: true})
                            }
                        })
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