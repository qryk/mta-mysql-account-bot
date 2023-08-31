const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
const mysql = require("mysql");
const { channel } = require("diagnostics_channel");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("duyuru-gönder")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
			option
				.setName('başlık')
				.setDescription('Duyurunun Başlığı(örn: sistem güncellemeleri).')
				.setRequired(true))
    .addStringOption(option =>
        option
          .setName('açıklama')
          .setDescription('Duyurunun Açıklama(örn: f1 panel değişti).')
          .setRequired(true))
          .addChannelOption(option =>
            option
              .setName('kanal')
              .setRequired(true)
              .setDescription('Duyurunun gönderileceği kanal'))
              .addBooleanOption(option =>
                option
                  .setName('everyone')
                  .setRequired(true)
                  .setDescription('Everyone olup olmayacağını seçin')
        )
    .addStringOption(option =>
            option
              .setName('resim')
              .setDescription('Duyurunun resmi, resim yoska boş bırakın')
              )
    
    
    .setDescription("Girdiğiniz kullanıcının hesap verilerini görüntüleyin."),
    run: async (client, interaction) => {
        if(interaction.user.id != "1017171430019960904" && interaction.user.id != "185367033922322432"){
          const yok = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Bir sorunla kaşılaşıldı lütfen daha sonra tekra deneyiniz.");
          interaction.reply({embeds: [yok], ephemeral: true})
          return
        }
        const kanal = interaction.options.getChannel("kanal");
        const başlık = interaction.options.getString("başlık");
        const açıklama = interaction.options.getString("açıklama");
        const resim = interaction.options.getString("resim");
        const everyone = interaction.options.getBoolean("everyone")
        if(!kanal){
          return;
        }
        const dembed = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle(`${başlık}`)
                    .addFields({ name: "\u200B", value: `${açıklama}`})
                    .setDescription(`<:linebreak:1136378930530623518><:linebreak:1136378930530623518><:linebreak:1136378930530623518><:linebreak:1136378930530623518><:linebreak:1136378930530623518><:linebreak:1136378930530623518>`);
                    
        if(!resim){
          if(everyone == true){
            kanal.send({content:"||@evryone & @here||",embeds: [dembed]})
          }else if(everyone == false){
            kanal.send({embeds: [dembed]})
          }
        } else {
          dembed.setImage(`${resim}`)
          if(everyone == true){
            kanal.send({content:"||@evryone & @here||",embeds: [dembed]})
          }else if(everyone == false){
            kanal.send({embeds: [dembed]})
          }
        }
        const dembeda = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle(`Duyuru kanla gönderildi`);
        interaction.reply({ embeds: [dembeda]})
    }
}
