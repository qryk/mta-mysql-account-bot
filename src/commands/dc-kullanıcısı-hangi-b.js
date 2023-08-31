const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
const mysql = require("mysql")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("bağlı-olduğu-hesabı-bul")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
			option
				.setName('kullanıcı')
				.setDescription('Bağlantısı bulunacak olan kişi.')
				.setRequired(true))
    .setDescription("Eğer seçtiğiniz kişi MTA hesabı ile discorda bağlandıysa onun bağlantısını siler."),
    run: async (client, interaction) => {
        const hata = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Bir sorunla kaşılaşıldı lütfen daha sonra tekra deneyiniz.");
        if (interaction.member.roles.cache.has("1119652508940374078") && interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
            const user = interaction.options.getUser("kullanıcı");
            fs.access(`./src/database/baglanti/mta-${user.id}.json`, fs.constants.F_OK, (err) => {
                if (err) {
                    const yok = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle("Bu kullanıcı hiç bir mta hesabına bağlı değil.");
                    interaction.reply({ embeds: [yok], ephemeral: true})
                    return;
                }
                fs.readFile(`./src/database/baglanti/mta-${user.id}.json`, 'utf8', (err, data) => {
                    if (err) {
                      interaction.reply({embeds: [hata], ephemeral: true})
                      console.log(err)
                      return;
                    }
                    const obj = JSON.parse(data);
                    const yokv = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setDescription(`<@${user.id}> Adlı üye **${obj.username}** kullanıcı adlı MTA hesabı ile eşleşmiş.`);
                    interaction.reply({ embeds: [yokv], ephemeral: true})
                })
            })
        } else {
            const yokv = new EmbedBuilder()
                    .setColor("#2B2D31")
                    .setDescription(`Bu komutu kullanmaya yetkiniz yetmiyor.`);
                    interaction.reply({ embeds: [yokv], ephemeral: true})
        }
    }
}