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
        if(interaction.customId == "loginbutton"){
            const modal = new ModalBuilder()
			.setCustomId('modallogin')
			.setTitle('Venom Roleplay Login');
		const lg = new TextInputBuilder()
			.setCustomId('modalusername')
			.setLabel("Kullıcı adınızı giriniz.")
            .setPlaceholder("Username")
			.setStyle(TextInputStyle.Short);

		const lf = new TextInputBuilder()
			.setCustomId('modalpassword')
			.setLabel("Şifrenizi giriniz.")
            .setPlaceholder("Password")
			.setStyle(TextInputStyle.Short);
		const lb = new ActionRowBuilder().addComponents(lg);
		const lt = new ActionRowBuilder().addComponents(lf);
		modal.addComponents(lb, lt);
        
        fs.access(`./src/database/baglanti/mta-${interaction.user.id}.json`, fs.constants.F_OK, (err) => {
            if (err) {
                interaction.showModal(modal);
                return;
            }
            const hata = new EmbedBuilder()
                          .setColor("#2B2D31")
                          .setTitle("Zaten giriş yapmışsınız.");
                          interaction.reply({ embeds: [hata], ephemeral: true})
        })
		
        }
    }
}