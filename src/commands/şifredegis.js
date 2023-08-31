const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
const mysql = require("mysql")
const nodemailer = require("nodemailer")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("sifre-degis")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
			option
				.setName('password')
				.setDescription('Yeni şifreniz.')
				.setRequired(true))
    .setDescription("Bağlı olduğunuz hesabın şifresini değiştirmenize yarar."),
    run: async (client, interaction) => {
        const hata = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Bir sorunla kaşılaşıldı lütfen daha sonra tekra deneyiniz.");
        fs.access(`./src/database/baglanti/mta-${interaction.user.id}.json`, fs.constants.F_OK, (err) => {
            if (err) {
                const yok = new EmbedBuilder()
                .setColor("#2B2D31")
                .setTitle("Herhangi bir MTA hesabına bağlı değilsiniz.");
                interaction.reply({ embeds: [yok], ephemeral: true})
                return;
            }
            fs.access(`./src/database/modal/sdgs-${interaction.user.id}.json`, fs.constants.F_OK, (err) => {
                if (err) {

                    fs.access(`./src/database/timeout/sdgs-${interaction.user.id}.json`, fs.constants.F_OK, (err) => {
                        if (err) {
                            kontrol();
                            return;
                        }
                        fs.readFile(`./src/database/timeout/sdgs-${interaction.user.id}.json`, 'utf8', (err, data) => {
                            if (err) {
                              interaction.reply({content: "1", embeds: [hata], ephemeral: true})
                              console.log(err)
                              return;
                            }
                            const obj = JSON.parse(data);
                            const gecens = Date.now() - obj.date;
                            if(gecens < 86400000){
                                let milisaniye = 1800000-gecens;
                                    let saniye = Math.floor(milisaniye / 1000);
                                    let dakika = Math.floor(saniye / 60);
                                    saniye %= 60;
                                    const vaf2 = new EmbedBuilder()
                                .setColor("#2B2D31")
                                .setTitle(`24 saatte bir şifre değiştirebilirsiniz, tekrardan şifre değiştirmeniz için kalan süre: ${dakika} Dakika, ${saniye} Saniye.`);
                                interaction.reply({embeds: [vaf2], ephemeral: true})
                                return;
                            }
                        })
                    })
                    return;
                }
                fs.readFile(`./src/database/modal/sdgs-${interaction.user.id}.json`, 'utf8', (err, data) => {
                    if (err) {
                        interaction.reply({content: "4", embeds: [hata], ephemeral: true})
                      console.log(err)
                      return;
                    }
                    const obj = JSON.parse(data);
                    const gecens = Date.now() - obj.date;
                    if(gecens < 300000){
                            const vaf22 = new EmbedBuilder()
                        .setColor("#2B2D31")
                        .setTitle(`Zaten şifre değiştirme formunuz bulunmaktadır, 5 dakika sonra tekrar deneyiniz.`);
                        interaction.reply({embeds: [vaf22], ephemeral: true})
                        return;
                    } else {
                        kontrol();
                    }
                })
            
        })
        })

        function kontrol(){
            fs.readFile(`./src/database/baglanti/mta-${interaction.user.id}.json`, 'utf8', (err, data) => {
                if (err) {
                    interaction.reply({content: "3", embeds: [hata], ephemeral: true})
                  console.log(err)
                  return;
                }
                const obj = JSON.parse(data);
                var connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'root',
                    password : '',
                    database : 'database ismini girin'
                  });
                  
            const sql = `SELECT * FROM accounts WHERE username = '${obj.username}'`;
            connection.query(sql, (err, results) => {
                if(err){
                    interaction.reply({content: "2", embeds: [hata], ephemeral: true})
                    console.log(err)
                    return;
                }
                const usermail = results[0].email;
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
                                let mailContent = data.replace('${code}', randomNum).replace('https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=1024', yazıaga).replace('${interaction.user.username}', obj.username);
                                
                                let mailOptions = {
                                    from: 'mail adresinizi giriniz',
                                    to: ''+usermail,
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
                                        

                    
                                                                const data31 = {
                                                kullanıcıid: interaction.user.id,
                                                email: usermail,
                                                dkod: randomNum,
                                                username: obj.username,
                                                date: Date.now(),
                                                kalanhak: 3,
                                                yenisifre: interaction.options.getString("password")
                                            };
                                            const data3 = {
                                                kullanıcıid: interaction.user.id,
                                                date: Date.now()
                                            };
                                            console.log(Date.now())
                                            const jsonData = JSON.stringify(data31, null, 2);
                                            const jsonData2 = JSON.stringify(data3, null, 2);
                                            fs.writeFile(`./src/database/modal/sdgs-${interaction.user.id}.json`, jsonData, 'utf8', (err) => {
                                                if (err) {
                                                    console.log("islem 14")
                                                  console.error('Dosya oluşturma hatası:', err);
                                                }
                                              });
                                              fs.writeFile(`./src/database/timeout/sdgs-${interaction.user.id}.json`, jsonData2, 'utf8', (err) => {
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
                                                  
                                                const exampleEmbed1 = new EmbedBuilder()
                                                .setColor("#2B2D31")
                                                .setTitle('Son bir adım kaldı, Mail edresinize('+ hideEmail(usermail) +') gelen kodu "Doğrula" yazılı düğmeye tıklayarak giriniz.');
                                            interaction.reply( { embeds: [exampleEmbed1], ephemeral: true, components: [row2]});
                                                 
                                        }
                                    })
                            })
            })
            })
        }
    }
}