const {  ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require('fs');
const { owner, logchannel, mysqldatabase, mysqlhost, mysqlpass, mysqluser, sunucuismi } = require("../../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sunucu-duyuru")
    .addChannelOption(option =>
			option
				.setName('kanal')
				.setDescription('Duyurunun Gönderileceği Kanalı Seçiniz.')
        .addChannelTypes(ChannelType.GuildText)
				.setRequired(true))
        .addStringOption(option =>
          option.setName('içerik')
            .setDescription('Duyurunun İçeriğini Seçiniz')
            .setRequired(true)
            .addChoices(
              { name: 'Aktif Duyurusu', value: 'sva' },
              { name: 'Bakım Duyurusu', value: 'svb' },
              { name: 'Restart Duyurusu', value: 'svr' },
            ))
    .setDescription("Aktif, Bakım, Restart Duyurusu Göndermenizi Sağlar."),
    run: async (client, interaction) => {
      

      if(interaction.member.permissions.has(PermissionsBitField.Flags.MentionEveryone)){
        const category = interaction.options.getString('içerik');
        const kanal = interaction.options.getChannel('kanal');
        const kanalid = kanal.id;
const channel = client.channels.cache.get(kanalid);


        if(category == 'sva'){
          const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setURL('https://shorturl.at/go014')
					.setLabel('👾Sunucuya Bağlan!')
					.setStyle(ButtonStyle.Link),
			);
          const exampleEmbed = new EmbedBuilder()
          .setTitle(`Venom Roleplay - Aktif Duyurusu`)
          .setColor("#2B2D31")
          .setDescription(`MTA sunucumuz şimdi **Aktif** Duruma Geçiş Yaptı, Tüm oyuncularımızı sunucumuza bekliyoruz. Bağlanmak için Aşağıdaki Düğme İle Veya '**mta sunucu ip adresini girin:22003**' İpsi Üzerinden Girş Sağlayabilirsiniz. \n \n **${interaction.user.username}** Yetkilisi Tarafından Duyuruldu!`)
          .setThumbnail('https://cdn.discordapp.com/attachments/1120121126484451458/1125533980851179680/2.png')
          .setImage('https://cdn.discordapp.com/attachments/1120121126484451458/1125899984085205032/VR1_GIF.gif');
          channel.send({ content: "|| @everyone ||", embeds: [exampleEmbed], components: [row]}).then(() => {
            const exampleEmbed311222 = new EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle("Aktif Duyurusu Başarıyla "+ kanal.name+ " Adlı Kanala Gönderildi!");
            
          interaction.reply({ embeds: [exampleEmbed311222], ephemeral: true})
          })





        } else if(category == 'svb'){




          
              const exampleEmbed = new EmbedBuilder()
              .setTitle(`Venom Roleplay - Bakım Duyurusu`)
              .setColor("#2B2D31")
              .setDescription(`MTA sunucumuz şimdi **Bakım** Durumuna Geçiş Yaptı, Tüm oyuncularımızın sabırla beklemesini rica ediyoruz. \n \n **${interaction.user.username}** Yetkilisi Tarafından Duyuruldu!`)
              .setThumbnail('https://cdn.discordapp.com/attachments/1120121126484451458/1125533980851179680/2.png')
            .setImage('https://cdn.discordapp.com/attachments/1120121126484451458/1125899984085205032/VR1_GIF.gif');
              channel.send({ content: "|| @everyone ||", embeds: [exampleEmbed]}).then(() => {
                const exampleEmbed311222 = new EmbedBuilder()
                .setColor("#2B2D31")
                .setTitle("**Bakım** Duyurusu Başarıyla "+ kanal.name+ " Adlı Kanala Gönderildi!");
                
              interaction.reply({ embeds: [exampleEmbed311222], ephemeral: true})
              })






        } else if(category == 'svr'){
          const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setURL('https://shorturl.at/stzAU')
					.setLabel('👾Sunucuya Bağlan!')
					.setStyle(ButtonStyle.Link),
			);
          const exampleEmbed = new EmbedBuilder()
          .setTitle(`Venom Roleplay - Restart Duyurusu`)
          .setColor("#2B2D31")
          .setDescription(`MTA sunucumuz şuanda teknik nedenlerden dolayı **Restartlandı**, Sunucumuza '**mta sunucu ip adresini girin:22003**' İpsi Üzerinden Veya Alttaki Düğmeden Giriş Sağlayabilirsiniz. \n \n **${interaction.user.username}** Yetkilisi Tarafından Duyuruldu!`)
          .setThumbnail('https://cdn.discordapp.com/attachments/1120121126484451458/1125533980851179680/2.png')
          .setImage('https://cdn.discordapp.com/attachments/1120121126484451458/1125899984085205032/VR1_GIF.gif');
          channel.send({ content: "|| @everyone ||", embeds: [exampleEmbed], components: [row]}).then(() => {
            const exampleEmbed311222 = new EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle("Restart Duyurusu Başarıyla "+ kanal.name+ " Adlı Kanala Gönderildi!");
            
          interaction.reply({ embeds: [exampleEmbed311222], ephemeral: true})
          })

        };






      } else {
        const exampleEmbed31122 = new EmbedBuilder()
        .setColor("#2B2D31")
        .setTitle("Bu Komutu Kullanmak İçin Yetkin Yetmiyor.");
      interaction.reply({ embeds: [exampleEmbed31122], ephemeral: true})
      }

    
			
    }
 };
