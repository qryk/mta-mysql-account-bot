const { EmbedBuilder, PermissionsBitField, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const { error } = require("console");

const mysql = require("mysql");
const { owner, logchannel, mysqldatabase, mysqlhost, mysqlpass, mysqluser, sunucuismi } = require("../../config.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("isim-değiş")
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('İsimi değişecek olan kişi.')
            .setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .setDescription("Discord isminizi karakter isimlerinizden biri yapamnıza yarar."),
    run: async (client, interaction) => {
        const select = new StringSelectMenuBuilder()
        .setCustomId('karaktermenu')
        .setPlaceholder('Karakteri seçiniz.');
        const user = interaction.options.getUser("kullanıcı")
        const hata = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Bir sorunla kaşılaşıldı lütfen daha sonra tekra deneyiniz.");
        fs.access(`./src/database/baglanti/mta-${user.id}.json`, fs.constants.F_OK, (err) => {
            if (err) {
                const yok = new EmbedBuilder()
                .setColor("#2B2D31")
                
                .setTitle("Hiç bir MTA Hesabıyla eşleşmemişsiniz.");
                interaction.reply({ embeds: [yok], ephemeral: true})
                return;
            }
            fs.readFile(`./src/database/baglanti/mta-${user.id}.json`, 'utf8', (err, data) => {
                if (err) {
                  interaction.reply({embeds: [hata], ephemeral: true})
                  console.log(err)
                  return;
                }
                const obj = JSON.parse(data);
                const connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: '',
                    database: 'database ismini girin'
                  });
                  function messianan(){
                  connection.connect((error) => {
                    (async () => {
                    
                    
                      console.log('MySQL bağlantısı başarılı.');
                      const query = `SELECT id, charactername FROM characters WHERE account = ${obj.acid}`;
                      
                      connection.query(query, (error, results) => {
                        if (error) {
                            interaction.reply({embeds: [hata], ephemeral: true})
                            console.log(err)
                            return;
                        } else {
                            let count = 0;
                          if (results.length === 0) {
                            const hatas = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Bir sorunla kaşılaşıldı lütfen daha sonra tekra deneyiniz.");
                    interaction.reply({embeds: [hatas], ephemeral: true})
                          } else {
                            
                            results.forEach((row) => {
                                count++;
                              const id = row.id;
                              const characterName = row.charactername;
                              select.addOptions(new StringSelectMenuOptionBuilder()
                              .setLabel(`${characterName}`)
                              .setValue(`${user.id}${id}`),)
                              if (count === results.length) {
                                messiananiki();
                              }
                            });
                          }
                        }
                        
                        
                        
                      });
                      
                      
                    
                    
                  });
                })();
                }
                function messiananiki(){
                    const hatass = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Lütfen kullanıcının istediği karakteri seçiniz.");
                    (async () => {
                    const row = new ActionRowBuilder()
			            .addComponents(select);
                    await interaction.reply({ emebds: [hatass], components: [row], ephemeral: true})
                })();
                }
                messianan();
            })
        })
    }
 };
