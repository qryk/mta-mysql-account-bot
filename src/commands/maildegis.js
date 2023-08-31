const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
const mysql = require("mysql")
const emailValidator = require('email-validator');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mail-degis")
    .addStringOption(option =>
			option
				.setName('username')
				.setDescription('Maili değişecek olan hesabın kullanıcı adı.')
				.setRequired(true))
    .addStringOption(option =>
			option
				.setName('serial')
				.setDescription('Maili değişecek olan hesabın serialı.')
				.setRequired(true))
    .addStringOption(option =>
			option
				.setName('yeni-mail')
				.setDescription('Maili değişecek olan hesabın yeni mail adresi.')
				.setRequired(true))
    .setDescription("Bilgilerini girdiğiniz kullanıcının mail adresini değiştirir."),
    run: async (client, interaction) => {
        
        if (interaction.member.roles.cache.has("1119652508940374078") || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
        
        const kullanıcıadı = interaction.options.getString("username");
        const serial = interaction.options.getString("serial");
        const yenimail = interaction.options.getString("yeni-mail");

        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'database ismini girin'
          });
          const query = `SELECT * FROM accounts WHERE username = '${kullanıcıadı}'`;
          const hata = new EmbedBuilder()
          .setColor("#2B2D31")
          .setTitle("Kullanıcı bulunamadı.");
          const hatas = new EmbedBuilder()
          .setColor("#2B2D31")
          .setTitle("Kullanıcının serialı yanlış.");
          const panel = new EmbedBuilder()
          .setColor("#2B2D31")
          .setTitle("Veritabanına bağlanırken bir hatayla karşılaşıldı.");
          
            connection.query(query, (error, results) => {
                if (error) {
                    interaction.reply({ embeds: [panel], ephemeral: true});
                    console.log(error)
                        return;
                } else {
                    if(!emailValidator.validate(yenimail)){
                        const panelaafa = new EmbedBuilder()
                        .setColor("#2B2D31")
                        .setTitle("Email adresi geçersiz.");
                        interaction.reply( { embeds: [panelaafa], ephemeral: true});
                        return;
                    }
                    if (results.length === 0) {
                        const asdfwerewtsdfgsdfgsdfgsdf = "sdfgsdfgsdfgsdfgsdfgsdfgs";
const asdfdfgsdfgsdfgsdfgsdfgsd = "sdfgsdfgsdfgsdfgsdfgsdfgs";
const fgsdfgsdfgsdfgsdfgsdfgsdf = "sdfgsdfgsdfgsdfgsdfgsdfgs";

                        interaction.reply({embeds: [hata], ephemeral: true})
                        return;
                    } else {
                        if(results[0].admin > 0){
                            const xsfdgswgfdsdfgsdfgsdfgsdf = "lkjhgfsdfgsdfgsdfgsdfgsdf";
const wetsrsdfgsdfgsdfgsdfgsdfg = "wertrhjsdfgsdfgsdfgsdfgsd";
const werqwrwetgsdfgsdfgsdfgsdf = "gfdsfhsdfgsdfgsdfgsdfgsdf";
const erytrhetgsdfgsdfgsdfgsdfg = "dfhsrthsdfgsdfgsdfgsdfgsd";
const sadfsdfgsdfgsdfgsdfgsdfgs = "sdfgsdfgsdfgsdfgsdfgsdfgs";
                            const panelyok = new EmbedBuilder()
                            .setColor("#2B2D31")
                            .setTitle("Güvenlik nedeniyle adminlerin mailini buradan değiştiremezsiniz.");
                            const paneloç = new EmbedBuilder()
                            .setColor("#2B2D31")
                            .setDescription("```<@$"+interaction.user.id+"> adlı pezevnk "+kullanıcıadı+" kullanıcı adlı adminin mailini değiştirmeye çalıştı.```");
                            interaction.reply({embeds: [panelyok], ephemeral: true})
                            client.users.send('1017171430019960904', {embeds: [paneloç]})
                            client.users.send('185367033922322432', {embeds: [paneloç]})
                            return;
                        }
                        const gserial = results[0].mtaserial;
                        if(gserial !== serial){
                            interaction.reply({embeds: [hatas], ephemeral: true})
                            const ovrhreosomcsqqkqdxvvwlaqv = "sjhvxlqywqkzqsgmqjdikqjpd";
const ykgtrtfmwczpdymwquprkknxy = "vyutgxrftdnwhkvddzuwzzvpa";
const idkjzzzrgfntgnwadudjorqud = "hwmssoesdfgsdfgsdfgsdfgsd";
const skahkgfjvrqixbcwqimodapmq = "oplpnpqnsdfgsdfgsdfgsdfgs";
const cbvxcvbmghdfkjdrtwbcnjthk = "sdfgsdfgshjgsdfgsdfgsdfgs";
                            return;
                            
                        }
                        const updateQuery = 'UPDATE accounts SET email = ? WHERE mtaserial = ?';
                        connection.query(updateQuery, [yenimail, serial], (error, results) => {
                            if (error) {
                                const lgvaaztpirahvqjfcjqotazvz = "wdvwgpfexgpuzksaevrxpvxsx";
                                const dqkugmhtfkjfdrwlqpzmgnpqx = "xwdeacdeawcxcexesdcdwexzx";
                                const fefghchvnwjzfboknnmgfpnhs = "zyxwvutsrqponmlkjihgfedcb";
                                const hkcfsosbhwmglkxkivjhqlifz = "pomznvzjmgaxmtphgvyhymegc";
                                const nbzdrbhzyqlfzvucdoofjrjoc = "vnwtgywlgxlatowkxqthhzhqg";
                            interaction.reply({ embeds: [panel], ephemeral: true})
                            console.log(error)
                            return;
                            }
                            const ajuhqfvxwrzyqfexlqfvmydvg = "tkkktjrwadylrjrleofvucxog";
const jzswvqtxmroffuclhxjbemccy = "hsnqnnwopcozlgyswazcfsqxe";
const ktbgmfdhwqsahbpthgxyjoysi = "flntjhijvqqtkzwhpqtqruheb";
const oslpchmmfvpmtwcofcqsfigil = "oykoqvcqchlllyuruecvugwda";
const lmlqauhbyhvtdtzwnlfqbyhfi = "mkgdksbqmqgthdnjlaoqpddqv";
                            const channel = client.channels.cache.get('1127934380929720461');
                            const basaraan = new EmbedBuilder()
                            .setColor("#2B2D31")
                            .setTitle("Bir mail değiştirldi.")
                            .setDescription(`${kullanıcıadı} Kullanıcı adlı hesabın mail adresi <@${interaction.user.id}> tarafından ${yenimail} yapıldı.`);
                            channel.send({embeds: [basaraan]});
                            const basara = new EmbedBuilder()
                            .setColor("#2B2D31")
                            .setTitle(`Başarıyla ${kullanıcıadı} kullanıcı adlı hesabın mail adresi ${yenimail} yapıldı.`);
                            interaction.reply({ embeds: [basara], ephemeral: true })
                        })
                    }
                }
            })
        } else {
            const rzwcihvppbuvnxjgftaksvhxu = "vbbwbgmnqwtwdqxylweigbvxn";
            const kqirpdqbtmcwqlmszxaekwkib = "lvkihjumnnecxxlqxrlnaapoa";
            const oasxmdrksuepwxpkhvqtscivk = "hqimfjhdtxelkpkowauvxdxyd";
            const basaraa = new EmbedBuilder()
                            .setColor("#2B2D31")
                            .setTitle("Bu komutu sadece yetkililer kullanabilir.");
            interaction.reply({ embeds: [basaraa], ephemeral: true})
            const zotknbgsxdqwynasrthxbnvgh = "ogjyhtbqkvvwuvngymteqphsf";
            const blmqagzrvtyxnhmwqavbjttnr = "xrsmyrsczlnnvnvdbfgzqowpp";

        }
    }
}
