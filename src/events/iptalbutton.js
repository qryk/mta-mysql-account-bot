const { EmbedBuilder, PermissionFlagsBits, ChannelType, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
module.exports = {
    name: 'interactionCreate',
    once: false,

    async execute(interaction, client) {
        if (!interaction.isButton()) return;
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'database ismini girin'
      });
        if(interaction.customId == "iptalbutton"){
            const hata = new EmbedBuilder()
                          .setColor("#2B2D31")
                          .setTitle("Zaten giriş formunuz bulunmamaktadır.");
                   
            fs.access(`./src/database/modal/ugd-${interaction.user.id}.json`, fs.constants.F_OK, (err) => {
                if (err) {
                    interaction.reply({ embeds: [hata], ephemeral: true})
                    return;
                }
                fs.readFile(`./src/database/modal/ugd-${interaction.user.id}.json`, 'utf8', (err, data) => {
                    const panel = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Bir hata oluştu lütfen daha sonra deneyiniz.");
                    if (err) {
                        interaction.reply({embeds: panel, ephemeral: true})
                      console.log(err)
                      return;
                    }
                    const obj = JSON.parse(data);
                    const gsure = Date.now() - data.date
                    if(gsure > 300000){
                        interaction.reply({ embeds: [hata], ephemeral: true})
                        return;
                    } else {
                        fs.unlink(`./src/database/modal/ugd-${interaction.user.id}.json`, (err) =>{
                            if(err){
                                interaction.reply({embeds: [panel], ephemeral: true})
                                return;
                            }
                            const panel2 = new EmbedBuilder()
                                .setColor("#2B2D31")
                                .setTitle("Giriş formunuz başarıyla iptal edilmiştir.");
                            interaction.reply({ embeds: [panel2], ephemeral: true})
                            
                        })
                    }
                })
            })
        }
    }
}