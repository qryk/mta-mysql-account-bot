const { EmbedBuilder, PermissionFlagsBits, ChannelType, ModalBuilder, PermissionsBitField,ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { userInfo } = require('os');
const { channel } = require('diagnostics_channel');
module.exports = {
    name: 'interactionCreate',
    once: false,

    async execute(interaction, client) {
        if (!interaction.isModalSubmit()) return;
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'database ismini girin'
      });
        if(interaction.customId == "dogrulamodal"){
          
            const ucode = interaction.fields.getTextInputValue('modalkod');
            const hata = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Bir sorunla kaşılaşıldı lütfen daha sonra tekra deneyiniz.");
            const besdk = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("5 dakika içersinde kodu girmediğiniz için giriş formunuz iptal edilmiştir.");
            const cf = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("çok fazla başarısız giriş denemesi yaptığınız için giriş formunuz iptal edilmiştir.");
            fs.access(`./src/database/modal/ugd-${interaction.user.id}.json`, fs.constants.F_OK, (err) => {
                if (err) {
                    const yok = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Giriş formunuz bulunmamaktadır.");
                    interaction.reply({ embeds: [yok], ephemeral: true})
                    return;
                }
                fs.readFile(`./src/database/modal/ugd-${interaction.user.id}.json`, 'utf8', (err, data) => {
                    if (err) {
                      interaction.reply({embeds: [hata], ephemeral: true})
                      console.log(err)
                      return;
                    }
                    const obj = JSON.parse(data);
                    const asure = Date.now();
                    const gcens = asure - obj.date
                    console.log(gcens)
                    if(gcens > 300000){
                        interaction.reply({embeds: [besdk], ephemeral: true})
                    } else {
                        if(obj.kalanhak == 0){
                            interaction.reply({embeds: [cf], ephemeral: true})
                            return;
                        }
                        if(ucode != obj.dkod){
                            const kalanhakk = obj.kalanhak - 1;
                            const cf = new EmbedBuilder()
                                .setColor("#2B2D31")
                                .setTitle("Girmiş olduğunuz kod yanlış, kalan doğrulama denemesi hakkınız: "+kalanhakk);
                            return;
                        }
                        function messia1(){
                          (async () => {
                        await interaction.member.roles.add("1119654182455099513")
                        await interaction.member.roles.remove("1119654184992637060")
                        const yeniMetin = await obj.chname.replace(/_/g, ' ');
                        await interaction.member.setNickname(`${yeniMetin}`)
                        messia2();
                      })();
                        }
                        function messia2(){
                        const dc = "1"
                        const updateValuesQuery = `UPDATE accounts SET discord = ${dc}, dcid = ${interaction.user.id} WHERE username = '${obj.username}'`;

                            connection.query(updateValuesQuery, (err, result) => {
                                if(err){
                                    interaction.reply({embeds: [hata], ephemeral: true})
                                    console.log(err)
                                }
                            })
                            const embedss = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Başarıyla "+ obj.username + " Kullanıcı adlı MTA hesbaınız ile discord sunucumuza giriş yaptınız.");
                        interaction.reply({embeds: [embedss], ephemeral: true})
                        
                        interaction.guild.channels.create({
                            name: 'ᴠᴇɴᴏᴍ・'+ obj.username+'',
                            type: ChannelType.GuildText,
                            parent: '1125777294649200720',
                            topic: '**'+ obj.username +'** Kullanıcı Adlı Hesabın Karakter Verileri!',
                            permissionOverwrites: [
                              {
                                id: ''+ interaction.user.id +'',
                                allow: [PermissionsBitField.Flags.ViewChannel],
                              },
                              {
                                id: ''+ interaction.guild.roles.everyone.id +'',
                                deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                              }
                            ]
                          }).then(channell => {
                            const data3 = {
                              kullanıcıid: interaction.user.id,
                              chname: obj.chanme,
                              username: obj.username,
                              acid: obj.acid,
                              email: obj.email,
                              oykn: channell.id,
                              isec: false
  
                          };
                          const data4 = {
                            kullanıcıid: interaction.user.id,
                            oykn: channell.id,
                            tarih: Date.now()

                        };
                        const jsonDatad = JSON.stringify(data4, null, 2);
                        fs.writeFile(`./src/database/timeout/oct-${interaction.user.id}.json`, jsonDatad, 'utf8', (err) => {
                          if (err) {
                            console.error('Dosya oluşturma hatası:', err);
                          }
                        });
                          console.log(Date.now())
                          const jsonData = JSON.stringify(data3, null, 2);
                          fs.writeFile(`./src/database/baglanti/mta-${interaction.user.id}.json`, jsonData, 'utf8', (err) => {
                              if (err) {
                                console.error('Dosya oluşturma hatası:', err);
                              }
                            });
                            const channelda = interaction.guild.channels.cache.get(channell.id);
                            const cf = new EmbedBuilder()
                            .setColor("#2B2D31")
                            .setTitle("Karakter verilerini yenilemek için 'Yenile' düğmesine tıklayınız.");
                            const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('yadc')
					.setLabel('🔄 Yenile')
					.setStyle(ButtonStyle.Primary),
			);
            channelda.send({ embeds: [cf], components: [row]})
                            channelda.send({ content: `<@${interaction.user.id}>`}).then(msg => {

                                setTimeout(() => {
                                  msg.delete();
                                }, 1000);
                                
                              })
                            connection.query('SELECT charactername, money, lastlogin, id, maxinteriors, maxvehicles, hoursplayed, bankmoney, faction_id ,skin FROM characters WHERE account = '+ obj.acid +'', function (error, results, fields) {
                                if (error) throw error;
                                
                                    results.forEach(function(result, index) {
                                      let nArray2 = [];
                                      if(result.faction_id == -1){
                                        
                                        const yeniMetinn = result.charactername.replace(/_/g, ' ');
                                        const attachment = new AttachmentBuilder(`./skins/2.png`, { name: `2.png` })
                                        const embed = new EmbedBuilder()
                                          .setColor("#2B2D31")
                                          .setThumbnail('attachment://2.png')
                                          .setTitle(`Karakteriniz ${yeniMetinn} Verileri:`)
                                          .addFields(
                                            { name: 'Cüzdan Parası:', value: '```'+ result.money +'```', inline: true },
                                            { name: 'Banka Parası:', value: '```'+ result.bankmoney +'```', inline: true },
                                            { name: 'Oynama Saati:', value: '```'+ result.hoursplayed +'```', inline: true },
                                            { name: 'Kayıt Tarihi:', value: '```'+ result.lastlogin +'```', inline: false },
                                            { name: 'Birliği:', value: '```Hiç Bir Birlikte Değil```', inline: false },
                                          );
                                            function al1(){
                                          connection.query('SELECT id FROM interiors WHERE owner = ' + result.id +' AND deleted = 0', function(error, results, fields) {
                                            if (error) throw error;
                                            
                                            if (results.length > 0) {
                                              let interiors = "";
                                              
                                              results.forEach(function(result, index) {
                                                interiors += result.id + ", ";
                                              });
                                              
                                              interiors = interiors.slice(0, -2);
                                              embed.addFields(
                                                { name: 'Evleriniz('+results.length+'/'+result.maxinteriors+'):', value: '```' + interiors + '```', inline: false }
                                              );
                                              al2();
                                            } else {
                                              embed.addFields(
                                                { name: 'Evleriniz:', value: '```Hiç Bir Eviniz Yok```', inline: false }
                                              );
                                              al2();
                                            }
                                          });
                                          
                                        }
                                        function al2(){
                                          connection.query('SELECT id FROM vehicles WHERE owner = ' + result.id +' AND deleted = 0', function(error, results, fields) {
                                            if (error) throw error;
                                            
                                            if (results.length > 0) {
                                              let araçlar = "";
                                              
                                              results.forEach(function(result, index) {
                                                araçlar += result.id + ", ";
                                              });
                                              
                                              araçlar = araçlar.slice(0, -2);
                                              embed.addFields(
                                                { name: 'Araçlarınız('+results.length+'/'+result.maxvehicles+'):', value: '```' + araçlar + '```', inline: false }
                                              );
                                              al3();
                                            } else {
                                              embed.addFields(
                                                { name: 'Araçlarınız:', value: '```Hiç Bir Aracınız Yok```', inline: false }
                                              );
                                              al3();
                                            }
                                          });
                                          
                                        }
                                        function al3(){
                                          (async () => {
                                          const channelagam = await interaction.guild.channels.cache.get(channell.id);
                                          await channelagam.send({ embeds: [embed], files: [attachment] });
                                          console.log(`${index + 1}. isim: ${result.charactername}, para: ${result.money}, banka para: ${result.bankmoney}`);
                                        })();
                                        }
                                          al1();
                                          
                                        } else {
                                          
                                            connection.query('SELECT name FROM factions WHERE id = '+ result.faction_id, function (error, results, fields) {
                                              if (error) throw error;
                                              console.log('Faction name: ', results[0].name);
                                              const yeniMetinnn = result.charactername.replace(/_/g, ' ');
                                              const attachment = new AttachmentBuilder(`./skins/2.png`, { name: `2.png` })
                                              const embed = new EmbedBuilder()
                                                .setColor("#2B2D31")
                                                .setThumbnail('attachment://2.png')
                                            .setTitle(`Karakteriniz ${yeniMetinnn} Verileri:`)
                                            .addFields(
                                              { name: 'Cüzdan Parası:', value: '```'+ result.money +'```', inline: true },
                                              { name: 'Banka Parası:', value: '```'+ result.bankmoney +'```', inline: true },
                                              { name: 'Oynama Saati:', value: '```'+ result.hoursplayed +'```', inline: true },
                                              { name: 'Kayıt Tarihi:', value: '```'+ result.lastlogin +'```', inline: false },
                                              { name: 'Birliği:', value: '```' + results[0].name +'```', inline: false },
                
                                            );
                                            function all1(){
                                            connection.query('SELECT id FROM interiors WHERE owner = ' + result.id +' AND deleted = 0', function(error, results, fields) {
                                              
                                                if (error) throw error;
                                                
                                                if (results.length > 0) {
                                                  let interiors = "";
                                                  
                                                  results.forEach(function(result, index) {
                                                    interiors += result.id + ", ";
                                                  });
                                                  
                                                  interiors = interiors.slice(0, -2);
                                                  embed.addFields(
                                                    { name: 'Evleriniz('+results.length+'/'+result.maxinteriors+'):', value: '```' + interiors + '```', inline: false }
                                                  );
                                                  all2();
                                                } else {
                                                  embed.addFields(
                                                    { name: 'Evleriniz:', value: '```Hiç Bir Eviniz Yok```', inline: false }
                                                  );
                                                  all2();
                                                }
                                              });
                                              
                                            }
                                            function all2(){
                                              connection.query('SELECT id FROM vehicles WHERE owner = ' + result.id +' AND deleted = 0', function(error, results, fields) {
                                                if (error) throw error;
                                                
                                                if (results.length > 0) {
                                                  let araçlar = "";
                                                  
                                                  results.forEach(function(result, index) {
                                                    araçlar += result.id + ", ";
                                                  });
                                                  
                                                  araçlar = araçlar.slice(0, -2);
                                                  embed.addFields(
                                                    { name: 'Araçlarınız('+results.length+'/'+result.maxvehicles+'):', value: '```' + araçlar + '```', inline: false }
                                                  );
                                                  all3();
                                                } else {
                                                  embed.addFields(
                                                    { name: 'Araçlarınız:', value: '```Hiç Bir Aracınız Yok```', inline: false }
                                                  );
                                                  all3();
                                                }
                                              });
                                              
                                            }
                                            function all3(){
                                            (async () => {
                                              const channelagam = interaction.guild.channels.cache.get(channell.id);
                                              
                                                await channelagam.send({ embeds: [embed], files: [attachment] });
                                              })();
                                console.log(`${index + 1}. isim: ${result.charactername}, para: ${result.money}, banka para: ${result.bankmoney}`);
                                            }
                                            all1();
                              });
                              
                           
                                      } 
                                      
                                          })
                                          
                                        })
                                        
                          })
                        }
                          messia1();
                        }
                        })
                    })
                          
        }
    }
}