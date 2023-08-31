const { EmbedBuilder, PermissionFlagsBits, ChannelType, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
module.exports = {
    name: 'interactionCreate',
    once: false,

    async execute(interaction, client) {
        if (!interaction.isStringSelectMenu()) return;
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'database ismini girin'
      });
        if(interaction.customId == "karaktermenu"){
            const hata = new EmbedBuilder()
                          .setColor("#2B2D31")
                          .setTitle("Bir sorun oluştu ltfen daha sonra tekrar deneyiniz.");
            var sonHaneSayisi = 5;
            var metin = interaction.values.toString();
            var metin1 = metin.slice(-sonHaneSayisi);
            var metin2 = metin.slice(0, -sonHaneSayisi);
            const basa = new EmbedBuilder()
                          .setColor("#2B2D31")
                          .setDescription(`Başrıyla <@${metin2}> adlı kullanıcının kullanıcı adı değiştirildi.`);
                          const query = `SELECT charactername FROM characters WHERE id = ${metin1}`;
                      
                          connection.query(query, (error, results) => {
                            if (error) {
                                interaction.reply({embeds: [hata], ephemeral: true})
                                console.log(err)
                                return;
                            } else {
                                let count = 0;
                              if (results.length === 0) {
                                interaction.reply({embeds: [hata], ephemeral: true})
                                return;
                              } else {
                                (async () => {
                                    const kullanıcıad = results[0].charactername;
                                    const yeniMetin = kullanıcıad.replace(/_/g, ' ');
                                    const member = await interaction.guild.members.fetch(metin2);
                                    await member.setNickname(yeniMetin).then(() => {
                                        interaction.update({ embeds: [basa],components: [], ephemeral: true})
                                    })
                                })();
                              }
                            }
                        })
        }
    }
}