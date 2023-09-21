const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("send-login-panel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option =>
			option
				.setName('kanal')
        .addChannelTypes(ChannelType.GuildText)
				.setDescription('Panelin gönderileceği kanalı seçiniz.')
				.setRequired(true))
    .setDescription("Giriş paneli göndermenize yarar"),
    run: async (client, interaction) => {
      if(interaction.user.id !== "1017171430019960904" && interaction.user.id !== "185367033922322432"){
        const yet = new EmbedBuilder()
          .setColor("#2B2D31")
          .setTitle("Bu komutu sadece kurucular kullanabilir.");
          interaction.reply({ embeds: [yet], ephemeral: true})
          return;
      }
      const kanalid = interaction.options.getChannel("kanal").id;
      const panel = new EmbedBuilder()
          .setColor("#2B2D31")
          .setTitle("Venom Roleplay'e Hoş Geldin")
          .setThumbnail("https://cdn.discordapp.com/attachments/1120121126484451458/1125533980851179680/2.png")
          .setDescription("Discord sunucusuna MTA sunucumuza kayıt olduğunuz bilgilerle erişim sağlayabilirsiniz, eğer bir sorun oluşursa ticket açabilirsiniz.");

          const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('loginbutton')
					.setLabel('Giriş Yap')
					.setStyle(ButtonStyle.Secondary),
			);
      const channel = client.channels.cache.get(kanalid);
      channel.send({ embeds: [panel], components: [row]}).then(()=>{
        const panel = new EmbedBuilder()
          .setColor("#2B2D31")
          .setTitle("Panel başarıyla kanala gönderildi.");
        interaction.reply({ embeds: [panel], ephemeral: true});

      })
    }
 };
