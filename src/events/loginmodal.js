const { EmbedBuilder, PermissionFlagsBits, ChannelType, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');
module.exports = {
    name: 'interactionCreate',
    once: false,

    async execute(interaction, client) {
        if (!interaction.isModalSubmit()) return;
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'database ismini girin'
      });
        if(interaction.customId == "modallogin"){
            const panel = new EmbedBuilder()
                          .setColor("#2B2D31")
                          .setTitle("Bir hata oluştu lütfen daha sonra deneyiniz.");
                          const besdk = new EmbedBuilder()
                          .setColor("#2B2D31")
                          .setTitle("Zaten 5 dakika içerisinde bir giriş denemesi yaptınız daha sonra tekrar deneyiniz.");
            const hata = new EmbedBuilder()
                          .setColor("#2B2D31")
                          .setTitle("Şifre veya kullanıcı adınız hatalı.");
            const musername = interaction.fields.getTextInputValue('modalusername');
	        const mpassword = interaction.fields.getTextInputValue('modalpassword');
            fs.access(`./src/database/modal/ugd-${interaction.user.id}.json`, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.access(`./src/database/timeout/tmo-${interaction.user.id}.json`, fs.constants.F_OK, (err) => {
                        if (err) {
                          kont()
                          return;
                        }
                      
                        fs.readFile(`./src/database/timeout/tmo-${interaction.user.id}.json`, 'utf8', (err, data) => {
                            if (err) {
                                interaction.reply({embeds: [hata], ephemeral: true})
                              console.log(err)
                              return;
                            }
                            const obj = JSON.parse(data);
                            const asure = Date.now();
                            const gcens = asure - obj.date
                            console.log(gcens)
                            if(gcens < 300000){
                                
                                interaction.reply({embeds: [besdk], ephemeral: true})
                            } else {
                                kont()
                                console.log("bu isle 1")
                                return;
                            }
                          });
                      });
                  
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
                    if(gcens < 300000){
                        interaction.reply({embeds: [besdk], ephemeral: true})
                        console.log("1")
                    } else {
                        fs.access(`./src/database/timeout/tmo-${interaction.user.id}.json`, fs.constants.F_OK, (err) => {
                            if (err) {
                              kont()
                              return;
                            }
                            fs.readFile(`./src/database/timeout/tmo-${interaction.user.id}.json`, 'utf8', (err, data) => {
                                if (err) {
                                    interaction.reply({embeds: [hata], ephemeral: true})
                                  console.log(err)
                                  return;
                                }
                                const obj = JSON.parse(data);
                                const asure = Date.now();
                                const gcens = asure - obj.date
                                console.log(gcens)
                                if(gcens < 300000){
                                    console.log("islem 1")
                                    interaction.reply({embeds: [besdk], ephemeral: true})
                                } else {
                                    console.log("islem 2")
                                    kont()
                                    return;
                                }
                              });
                        })
                        return;
                    }
                  });

              });

            function kont(){
            connection.connect((error) => {
                console.log("islem 3")
                if (error) {
                        interaction.reply({ embeds: [panel], ephemeral: true});
                        console.log(error)
                        return;
                } else {
                    console.log('Veritabanı bağlantısı başarıyla kuruldu');
                }
                const query = `SELECT * FROM accounts WHERE username = '${musername}'`;

            connection.query(query, (error, results) => {
                console.log("islem 4")
                if (error) {
                    console.log("islem 5")
                    interaction.reply({ embeds: [panel], ephemeral: true});
                    console.log(error)
                        return;
                } else {
                    console.log("islem 6")
                    if (results.length === 0) {
                        console.log("islem 7")
                        interaction.reply({embeds: [hata], ephemeral: true})
                        return;
                    } else {
                        console.log("islem 8")
                        const discord = results[0].discord;
                        if(discord !== 0){
                            const panelaaf = new EmbedBuilder()
                            .setColor("#2B2D31")
                            .setTitle("Bu MTA hesabı zaten bir discord hesabına bağlı.");
                            interaction.reply( { embeds: [panelaaf], ephemeral: true});
                            return;
                        }
                        const storedPassword = results[0].password;
                        const email = results[0].email;
                        const acid = results[0].id;
                        if (storedPassword === mpassword) {
                            if(!emailValidator.validate(email)){
                                const panelaafa = new EmbedBuilder()
                                .setColor("#2B2D31")
                                .setTitle("Email adresiniz geçersiz, ticket kanalından ticket açınınz.");
                                interaction.reply( { embeds: [panelaafa], ephemeral: true});
                                return;
                            }
                            console.log("islem 9")
                            let transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'mail adresi',
                                    pass: 'mail şifre'
                                }
                            });
                            
                            let randomNum = Math.floor(Math.random() * 900000) + 100000;

                            fs.readFile('email.html', 'utf8', (err, data) => {
                                console.log("islem 10")
                                if (err) throw err;
                                let yazıaga = `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=1024`
                                let mailContent = data.replace('${code}', randomNum).replace('https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=1024', yazıaga).replace('${interaction.user.username}', musername);
                                
                                let mailOptions = {
                                    from: 'mail adresinizi giriniz',
                                    to: ''+email,
                                    subject: 'Venom Roleplay Doğrulama Kodunuz.',
                                    html: `${mailContent}`
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                    console.log("islem 11")
                                    if (error) {
                                        console.log("islem 12")
                                        console.log(error);
                                    } else {
                                        console.log("islem 13")
                                        const saltRounds = 10;
                                        console.log('Email sent: ' + info.response);
                                        const query = `SELECT charactername FROM characters WHERE account = '${acid}' ORDER BY hoursplayed DESC LIMIT 1`;

                    connection.query(query, (err, results) => {
                        if (err) {
                        console.error('Sorgu hatası:', err);
                        return;
                        } 
                                                                const data31 = {
                                                kullanıcıid: interaction.user.id,
                                                email: email,
                                                dkod: randomNum,
                                                username: musername,
                                                date: Date.now(),
                                                kalanhak: 3,
                                                acid: acid,
                                                chname: results[0].charactername
                                            };
                                            const data3 = {
                                                kullanıcıid: interaction.user.id,
                                                date: Date.now()
                                            };
                                            console.log(Date.now())
                                            const jsonData = JSON.stringify(data31, null, 2);
                                            const jsonData2 = JSON.stringify(data3, null, 2);
                                            fs.writeFile(`./src/database/modal/ugd-${interaction.user.id}.json`, jsonData, 'utf8', (err) => {
                                                if (err) {
                                                    console.log("islem 14")
                                                  console.error('Dosya oluşturma hatası:', err);
                                                }
                                              });
                                              fs.writeFile(`./src/database/timeout/tmo-${interaction.user.id}.json`, jsonData2, 'utf8', (err) => {
                                                if (err) {
                                                    console.log("islem 15")
                                                  console.error('Dosya oluşturma hatası:', err);
                                                } 
                                              });
                                            
                                                const row2 = new ActionRowBuilder()
                                                    .addComponents(
                                                         new ButtonBuilder()
                                                            .setCustomId('dogrulabutton')
                                                            .setEmoji('🔑')
                                                            .setLabel('Doğrula')
                                                            .setStyle(ButtonStyle.Success),
                                                        new ButtonBuilder()
                                                            .setCustomId('iptalbutton')
                                                            .setLabel('İptal et')
                                                            .setEmoji('✖️')
                                                            .setStyle(ButtonStyle.Danger),
                                                );  
                                                function hideEmail(email) {
                                                    const atIndex = email.indexOf('@');
                                                    if (atIndex <= 1) {
                                                      return email;
                                                    }
                                                  
                                                    const username = email.substr(0, atIndex);
                                                    const domain = email.substr(atIndex + 1);
                                                    const hiddenUsername = username.charAt(0) + '-'.repeat(username.length - 2) + username.charAt(username.length - 1);
                                                    const hiddenDomain = domain.charAt(0) + '-'.repeat(domain.length - 2) + domain.charAt(domain.length - 1);
                                                    return hiddenUsername + '@' + hiddenDomain;
                                                  }
                                                  
                                                const exampleEmbed = new EmbedBuilder()
                                                .setColor("#2B2D31")
                                                .setTitle('Son bir adım kaldı, Mail edresinize('+ hideEmail(email) +') gelen kodu "Doğrula" yazılı düğmeye tıklayarak giriniz.');
                                            interaction.reply( { embeds: [exampleEmbed], ephemeral: true, components: [row2]});
                                                }) 
                                        }
                                    })
                            })
                        
                        } else {
                            interaction.reply({embeds: [hata], ephemeral: true})
                            return;
                        }
                    }
                }
            });
            });
        }
    }
    }
}