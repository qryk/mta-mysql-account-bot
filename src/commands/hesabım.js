const { EmbedBuilder, PermissionsBitField, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const { error } = require("console");

const mysql = require("mysql");
const { owner, logchannel, mysqldatabase, mysqlhost, mysqlpass, mysqluser, sunucuismi } = require("../../config.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("hesabım")
    .setDescription("hesap verilerinizi Görüntüle."),
    run: async (client, interaction) => {
      
      

 
      const filePath = `./src/database/baglanti/mta-${interaction.user.id}.json`;
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "database ismini girin"
      });
      connection.connect(err => {
        const exampleEmbed = new EmbedBuilder()
  .setColor("#2B2D31")
	.setTitle('Şuanda Veritabanı Bakımda Veya Kapalı Durumda Olabilir, Lütfen Daha Sonra Tekrar Deneyiniz!');
        if(err) return interaction.reply({ embeds: [exampleEmbed], ephemeral: true});
          
        
    console.log("MySQL bağlantısı başarıyla kuruldu!");
    fs.access(filePath, fs.constants.F_OK, err => {""
      if (err) {
        const exampleEmbed31 = new EmbedBuilder()
                .setColor("#2B2D31")
                .setTitle("Hiç Bir MTA Hesabına Bağlı Değilsiniz, Bağlanmak İçin Giriş Paneline gidiniz!");
                  interaction.reply({ embeds: [exampleEmbed31], ephemeral: true})

      } else {
        const data = JSON.parse(fs.readFileSync(`./src/database/baglanti/mta-${interaction.user.id}.json`));

        const sql = `SELECT * FROM accounts WHERE username = '${data.username}'`;
            connection.query(sql, (err, results) => {
              if (err) throw err;
              const unid = results[0].id;
              const email = results[0].email
              const bakiye = results[0].balance
              const sgiriş = results[0].registerdate

              console.log(unid)
              connection.query('SELECT charactername FROM characters WHERE account = '+ data.acid +'', (error, results, fields) => {
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
                  .setTitle('Merhaba '+ data.username +' Hesap Verileriniz Şu Şekilde:')
                  
                  .addFields(
                    { name: 'E-mail Adresiniz', value: '```'+ email +'```', inline: false },
                    { name: 'Kayıt Tarihi', value: '```'+ sgiriş +'```', inline: true },
                    { name: 'Hesap Bakiyeniz', value: '```'+ bakiye +'```', inline: true },
                    { name: 'Karakter Sayınız', value: '```'+ results.length +'```', inline: true },
                    { name: 'Karakterleriniz: \n', value: '`'+ characternames +'`', inline: false },
                    
                  );

                    kid = interaction.user.id;
                    

                    console.log(characternames)



                  interaction.reply({ embeds: [embed], ephemeral: true})
                }
              });
            })
      }
    });
  })

    }
 };
