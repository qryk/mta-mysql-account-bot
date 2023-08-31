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
        const mysql = require('mysql');

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database ismini girin'
};

// characters tablosundan account değeri 198123 olan karakterlerin verilerini alıp yazdırma
function getCharacters() {
  const connection = mysql.createConnection(connectionConfig);

  const accountValue = '18215';
  const query = `SELECT charactername, skin, hoursplayed, id FROM characters WHERE account = ?`;

  connection.query(query, [accountValue], (error, results) => {
    if (error) {
      console.error('Sorgu hatası:', error);
      connection.end();
      return;
    }

    results.forEach((character) => {
      const characterData = `Character: ${character.charactername}, Skin: ${character.skin}, Hours Played: ${character.hoursplayed}, id: ${character.id}`;

      getVehicleIds(character.id, characterData);
    });

    connection.end();
  });
}

// vehicles tablosunda id'i owner sütununda aratarak vehicle ID'lerini alıp karakter verileriyle birlikte yazdırma
function getVehicleIds(id, characterData) {
  const connection = mysql.createConnection(connectionConfig);

  const query = `SELECT id FROM vehicles WHERE owner = ?`;

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Sorgu hatası:', error);
      connection.end();
      return;
    }

    const vehicleIds = results.map((row) => row.vehicleid).join(',');
    console.log(`${characterData}, Vehicle IDs: ${vehicleIds}`);

    connection.end();
  });
}

// Ana işlemi gerçekleştirme
getCharacters();

      })
    }
 };
