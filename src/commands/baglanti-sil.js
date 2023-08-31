const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
const mysql = require("mysql")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("baglanti-sil")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
			option
				.setName('kullanıcı')
				.setDescription('Bağlantısı silinecek olan kişi.')
				.setRequired(true))
    .setDescription("Eğer seçtiğiniz kişi MTA hesabı ile discorda bağlandıysa onun bağlantısını siler."),
    run: async (client, interaction) => {
      const hata = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Bir sorunla kaşılaşıldı lütfen daha sonra tekra deneyiniz.");
                    if(interaction.user.id !== "1017171430019960904" && interaction.user.id !== "185367033922322432"){
                      const yet = new EmbedBuilder()
                        .setColor("#2B2D31")
                        .setTitle("Bu komutu sadece kurucular kullanabilir.");
                        interaction.reply({ embeds: [yet], ephemeral: true})
                        return;
                    }
        const user = interaction.options.getUser("kullanıcı");
        const member = interaction.options.getMember("kullanıcı");
        if (!user){
          const errorr = new EmbedBuilder()
          .setColor("#2B2D31")
          .setTitle("Seçtiğiniz kullanıcı bulunamadı.");
        interaction.reply({ embeds: [errorr], ephemeral: true});
        return;
        }
        fs.access(`./src/database/baglanti/mta-${user.id}.json`, fs.constants.F_OK, (err) => {
          if (err) {
            const errorr = new EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle("Seçtiğiniz kullanıcı zaten bir hesaba bağlı değil.");
            
          interaction.reply({ embeds: [errorr], ephemeral: true});
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
            
            connection.connect((error) => {
              if (error) {
                console.error('Error connecting to the database: ', error);
                return;
              }
            

            
              const query = 'UPDATE accounts SET discord = 0, dcid = NULL WHERE id = ?';
            
              connection.query(query, [obj.acid], (error, results) => {
                if (error) {
                  
                  interaction.reply({ embeds: [hata], ephemeral: true})
                  console.log(error)
                  return;
                }
                (async () => {
                
                
                try {
                  const channel = await interaction.guild.channels.fetch(obj.oykn);
                  await channel.delete()
                  console.log("kanal silindi")
                } catch (error) {
                  console.log(error)

                }
                const channel2 =  client.channels.cache.get("1127934380929720461");
                  const basar2 = new EmbedBuilder()
                  .setColor("#2B2D31")
                  .setTitle(`Bir bağlantı silindi.`)
                  .setDescription(`<@${user.id}> Kullanıcısının **${obj.username}(${obj.acid})** Kullanıcı Adlı MTA Hesabıyla Yaptığı Bağlantı <@${interaction.user.id}> Tarafından Kaldırıldı.`);
                channel2.send({embeds: [basar2]})
                fs.unlink(`./src/database/baglanti/mta-${user.id}.json`, (err) => {
                  if (err) {
                  
                    interaction.reply({ embeds: [hata], ephemeral: true})
                    console.log(error)
                    return;
                  }
                  function messi(){
                    (async () => {
                  member.setNickname(`Kayıtsız`)
                  member.roles.remove("1119654182455099513")
                  member.roles.add("1119654184992637060")
                  messi2();
                })();
                }
                function messi2(){
                  const basar = new EmbedBuilder()
                .setColor("#2B2D31")
                .setTitle(`Başarıyla ${user.username} adlı kullanıcının bağlantısını sildiniz.`);
                  interaction.reply({embeds: [basar], ephemeral: true})
                }
                messi();
                })
              })();
              });
            });
          })
        })
    }
 };
