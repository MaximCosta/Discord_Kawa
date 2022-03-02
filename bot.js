const { Client, Emoji, TextChannel, CategoryChannel, PermissionOverwriteManager, ButtonInteraction, Intents, PermissionOverwrites, NewsChannel } = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { url } = require("inspector");
const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents, partials: ['CHANNEL',] });
require('dotenv').config();

client.on("ready", () => {
    console.log("\x1b[33m%s\x1b[0m", "                      ╔═════════════════════╗")
    console.log("\x1b[33m                      ║\x1b[0m", "\x1b[32m╔╦╗╦╔═╗╔╦╗╦═╗╔═╗╦ ╦\x1b[0m", "\x1b[33m║\x1b[0m")
    console.log("\x1b[33m                      ║\x1b[0m", "\x1b[32m║║║║╚═╗ ║ ╠╦╝║ ║║ ║\x1b[0m", "\x1b[33m║\x1b[0m")
    console.log("\x1b[33m                      ║\x1b[0m", "\x1b[32m╩ ╩╩╚═╝ ╩ ╩╚═╚═╝╚═╝\x1b[0m", "\x1b[33m║\x1b[0m")
    console.log("\x1b[33m%s\x1b[0m", "                      ╚═════════════════════╝")
    console.log("                   Connecté à", `\x1b[36m${client.user.tag}\x1b[0m`)
    console.log(`               ID du `, `\x1b[35m${client.user.tag}\x1b[0m`, ":", `\x1b[31m${client.user.id}\x1b[0m`)
    console.log(`       Avatar de`, `\x1b[33m${client.user.tag}\x1b[0m`, ":", `\x1b[34m${client.user.avatar}\x1b[36m`)
    client.user.setActivity("Coded by MisTrou", {
        type: "PLAYING",
    });
});

let PREFIX_NORMAL="+"
let PREFIX_WHITELIST="&"
let timer = 0;
let number_int = 0;
let log_message = 0;
let channel_log_message = 0;
let log_roll = 0;
let channel_log_roll = 0;
let log_ban = 0;
let channel_log_ban = 0;
let log_unban = 0;
let channel_log_unban = 0;
let log_kick = 0;
let channel_log_kick = 0;
let wl_role = "942507266840600766";

client.on("messageCreate", async message => {
    /*-------------------------------------------------------------------
       ____ ___  __  __ __  __    _    _   _ ____  _____   __    ___     __
     / ___/ _ \|  \/  |  \/  |  / \  | \ | |  _ \| ____| | _|  ( _ )   |_ |
    | |  | | | | |\/| | |\/| | / _ \ |  \| | | | |  _|   | |   / _ \/\  | |
    | |__| |_| | |  | | |  | |/ ___ \| |\  | |_| | |___  | |  | (_>  <  | |
    \____\___/|_|  |_|_|  |_/_/   \_\_| \_|____/|_____| | |   \___/\/  | |
                                                        |__|          |__|
    -------------------------------------------------------------------*/
    /*-----------------------------
    |COMMANDE HELP DE LA WHITELIST|
    -----------------------------*/
    if (message.content == `${PREFIX_WHITELIST}help`) {
        if (message.member.roles.cache.has(wl_role)) {
            const embed_setup = new MessageEmbed()
            .setColor("DARK_RED")
            .setFooter("Coded by MisTrou")
            .setTitle("[&] " +message.guild.name + " PROTECT COMMANDES")
            .setThumbnail(message.guild.iconURL())
            .setDescription("**:shield: Logs Messages**\n__*Active ou désactive les logs des messages*__\n`&logs_message <on/off>`\n\n**:shield: Logs Roll**\n__*Active ou désactive les logs des rolls*__\n`&logs_roll <on/off>`\n\n**:shield: Logs Ban / Unbans**\n__*Active ou désactive les logs des bans / unban*__\n`&logs_ban <on/off>`\n`&logs_unban <on/off>`\n\n**:shield: Logs Kick**\n__*Active ou désactive les logs des kick*__\n`&logs_kick <on/off>`\n\n**:shield: Ban / Unban**\n*__Permet de bannir un membre / débannir un membre__*\n`&ban <mention> | PAS ID !`\n`&unban <id> | PAS DE MENTION !`\n\n**:shield: Kick**\n*__Permet d'exclure un membre sans le ban (il pourrait rejoindre avec une autre invitation)__*\n`&kick <mention> | PAS ID !`\n\n**:shield: Verif WhiteList**\n*__Verifie les personnes qui sont dans la whitelist__*\n`&wl`\n\n**:shield: Embed Message**\nCrée une embed avec un message donner\n`&embed <texte>`\n\n**:shield: Clear**\nSupprime des messages\n`&clear <nombre>`")
            message.channel.send({ embeds : [embed_setup] });
        } else {
            message.channel.send("<@" + message.author.id + "> accès refusé !");
            setTimeout(() => msg.delete(), 5000);
        }
    }
    if (message.content.startsWith("&clear") && message.member.roles.cache.has(wl_role)) {
        let nb_clear = message.content.slice('&clear'.length).replace(/^\s+/gm, '');
        let int_clear = parseInt(nb_clear);
        if (isNaN(int_clear)) {
            return;
        }
        if (int_clear > 100) {
            int_clear = 100;
        }
        message.channel.bulkDelete(int_clear);
        const msg = await message.channel.send(`**${int_clear}** messages ont été supprimé`);
        setTimeout(() => msg.delete(), 5000);
    }
    /*------------------------------------
    |COMMANDE LOGS KICK AVEC LA WHITELISTE|
    -------------------------------------*/
    if (message.content.startsWith("&embed") && message.member.roles.cache.has(wl_role)) {
        let message_to_embed = message.content.slice('&embed'.length).replace(/^\s+/gm, '');
        const embed_messages = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(message.guild.name)
            .setDescription(message_to_embed)
            .setThumbnail(message.guild.iconURL())
            .setFooter("Coded by MisTrou")
        await message.channel.send({ embeds: [embed_messages]});
    }﻿
    /*------------------------------------
    |COMMANDE LOGS KICK AVEC LA WHITELISTE|
    -------------------------------------*/
    if (message.content.startsWith("&logs_kick") && message.member.roles.cache.has(wl_role)) {
        let on_or_off = message.content.slice('&logs_kick'.length).replace(/^\s+/gm, '');
        if (on_or_off == "on") {
            if (log_kick == 0) {
                log_kick = 1;
                channel_log_kick = await message.guild.channels.create("Logs-kick", {type: "GUILD_TEXT"});
                channel_log_kick.permissionOverwrites.create(message.guild.roles.everyone.id, { VIEW_CHANNEL: false })
                await client.channels.cache.get(channel_log_kick.id).send("<@&" + wl_role + "> **LES LOGS KICK ONT ÉTÉ ACTIVÉ PAR** <@" + message.author.id + ">");
            } else {
                    message.channel.send("<@" + message.author.id + "> **Les logs pour les kick sont déja activé !**");
            }
        }
        if (on_or_off == "off") {
            if (log_kick == 0) {
                message.channel.send("<@" + message.author.id + ">  **Les logs pour les kick ne sont pas activé !**");
            } else {
                log_kick = 0;
                await message.guild.channels.cache.get(channel_log_kick.id).delete();
                if (message.channelId != channel_log_kick.id) {
                    message.channel.send("<@&" + wl_role + "> **LES LOGS KICK ONT ÉTÉ DÉSACTIVÉ PAR **<@" + message.author.id + ">")
                }
            }
        }
    }
    /*---------------------------------------
    |COMMANDE LOGS UNBANS AVEC LA WHITELISTE|
    ---------------------------------------*/
    if (message.content.startsWith("&logs_unban") && message.member.roles.cache.has(wl_role)) {
        let on_or_off = message.content.slice('&logs_unban'.length).replace(/^\s+/gm, '');
        if (on_or_off == "on") {
            if (log_unban == 0) {
                log_unban = 1;
                channel_log_unban = await message.guild.channels.create("Logs-unban", { type: "text"});
                channel_log_unban.permissionOverwrites.create(message.guild.roles.everyone.id, { VIEW_CHANNEL: false })
                await client.channels.cache.get(channel_log_unban.id).send("<@&" + wl_role + "> **LES LOGS UNBANS ONT ÉTÉ ACTIVÉ PAR** <@" + message.author.id + ">");
            } else {
                    message.channel.send("<@" + message.author.id + "> **Les logs pour les unbans sont déja activé !**");
            }
        }
        if (on_or_off == "off") {
            if (log_unban == 0) {
                message.channel.send("<@" + message.author.id + ">  **Les logs pour les unbans ne sont pas activé !**");
            } else {
                log_unban = 0;
                await message.guild.channels.cache.get(channel_log_unban.id).delete();
                if (message.channelId != channel_log_unban.id) {
                    message.channel.send("<@&" + wl_role + "> **LES LOGS UNBANS ONT ÉTÉ DÉSACTIVÉ PAR **<@" + message.author.id + ">")
                }
            }
        }
    }
    /*-------------------------------------
    |COMMANDE LOGS BANS AVEC LA WHITELISTE|
    -------------------------------------*/
    if (message.content.startsWith("&logs_ban") && message.member.roles.cache.has(wl_role)) {
        let on_or_off = message.content.slice('&logs_ban'.length).replace(/^\s+/gm, '');
        if (on_or_off == "on") {
            if (log_ban == 0) {
                log_ban = 1;
                channel_log_ban = await message.guild.channels.create("Logs-ban", { type: "text"});
                channel_log_ban.permissionOverwrites.create(message.guild.roles.everyone.id, { VIEW_CHANNEL: false })
                await client.channels.cache.get(channel_log_ban.id).send("<@&" + wl_role + "> **LES LOGS BANS ONT ÉTÉ ACTIVÉ PAR** <@" + message.author.id + ">");
            } else {
                message.channel.send("<@" + message.author.id + "> **Les logs pour les bans sont déja activé !**");
            }
        }
        if (on_or_off == "off") {
            if (log_ban == 0) {
                message.channel.send("<@" + message.author.id + ">  **Les logs pour les ban sne sont pas activé !**");
            } else {
                log_ban = 0;
                await message.guild.channels.cache.get(channel_log_ban.id).delete();
                if (message.channelId != channel_log_ban.id) {
                    message.channel.send("<@&" + wl_role + "> **LES LOGS BANS ONT ÉTÉ DÉSACTIVÉ PAR **<@" + message.author.id + ">")
                }
            }
        }
    }
    /*-------------------------------------
    |COMMANDE LOGS ROLL AVEC LA WHITELISTE|
    -------------------------------------*/
    if (message.content.startsWith("&logs_roll") && message.member.roles.cache.has(wl_role)) {
        let on_or_off = message.content.slice('&logs_roll'.length).replace(/^\s+/gm, '');
        if (on_or_off == "on") {
            if (log_roll == 0) {
                log_roll = 1;
                channel_log_roll = await message.guild.channels.create("Logs-roll", { type: "text"});
                channel_log_roll.permissionOverwrites.create(message.guild.roles.everyone.id, { VIEW_CHANNEL: false })
                await client.channels.cache.get(channel_log_roll.id).send("<@&" + wl_role + "> **LES LOGS ROLL ONT ÉTÉ ACTIVÉ PAR** <@" + message.author.id + ">");
            } else {
                message.channel.send("<@" + message.author.id + "> **Les logs pour les roll sont déja activé !**");
            }
        }
        if (on_or_off == "off") {
            if (log_roll == 0) {
                message.channel.send("<@" + message.author.id + ">  **Les logs pour les roll ne sont pas activé !**");
            } else {
                log_roll = 0;
                await message.guild.channels.cache.get(channel_log_roll.id).delete();
                if (message.channelId != channel_log_roll.id) {
                    message.channel.send("<@&" + wl_role + "> **LES LOGS ROLL ONT ÉTÉ DÉSACTIVÉ PAR **<@" + message.author.id + ">")
                }
            }
        }
    }
    /*-----------------------------------------
    |COMMANDE LOGS MESSAGES AVEC LA WHITELISTE|
    ----------------------------------- -----*/
    if (message.content.startsWith("&logs_message") && message.member.roles.cache.has(wl_role)) {
        let on_or_off = message.content.slice('&logs_message'.length).replace(/^\s+/gm, '');
        if (on_or_off == "on") {
            if (log_message == 0) {
                log_message = 1;
                channel_log_message = await message.guild.channels.create("Logs-messages", { type: "text"});
                channel_log_message.permissionOverwrites.create(message.guild.roles.everyone.id, { VIEW_CHANNEL: false })
                await client.channels.cache.get(channel_log_message.id).send("<@&" + wl_role + "> **LES LOGS MESSAGES ONT ÉTÉ ACTIVÉ PAR** <@" + message.author.id + ">");
            } else {
                message.channel.send("<@" + message.author.id + "> **Les logs pour les messages sont déja activé !**");
            }
        }
        if (on_or_off == "off") {
            if (log_message == 0) {
                message.channel.send("<@" + message.author.id + "> **Les logs pour les messages ne sont pas activé !**");
            } else {
                log_message = 0;
                await message.guild.channels.cache.get(channel_log_message.id).delete();
                if (message.channelId != channel_log_message.id) {
                    message.channel.send("<@&" + wl_role + "> **LES LOGS MESSAGES ONT ÉTÉ DÉSACTIVÉ PAR** <@" + message.author.id + ">");
                }
            }
        }
    }
    /*------------------------------
    |MARQUER LES LOGS DES MESSAGES |
    ------------------------------*/
    if (log_message == 1 && message.author.id != client.user.id) {
        const embed_logs_messages = new MessageEmbed()
            .setAuthor(message.author.tag,  "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".gif")
            .setColor("GOLD")
            .setTitle(message.guild.name +" **LOGS MESSAGES**")
            .setDescription("`" + message.content + "` dans <#" + message.channelId + ">")
            .setThumbnail(message.guild.iconURL())
            .setFooter("Coded by MisTrou")
        await client.channels.cache.get(channel_log_message.id).send({ embeds: [embed_logs_messages]});
    }
    /*-----------------------
    |COMMANDE KICK UN MEMBRE|
    -----------------------*/
    if (message.content.startsWith("&kick") && message.member.roles.cache.has(wl_role)) {
        const member_mention = message.mentions.users.first();
        if (member_mention == null) {
            return;
        }
        const memberTarget = message.guild.members.cache.get(member_mention.id);
        if (memberTarget.roles.cache.has(wl_role)) {
            message.channel.send("<@" + message.author.id + "> cette personne est dans la <@&" + wl_role + "> JE NE PEUX PAS LA KICK");
            if (log_kick == 1) {
                const embed_logs_kick_fail = new MessageEmbed()
                    .setColor("DARK_GREY")
                    .setTitle(message.guild.name +" **KICK BAN**")
                    .setDescription("<@" + message.author.id + "> à essayé de **kick** <@" + member_mention + ">")
                    .setFooter("Coded by MisTrou")
                    .setThumbnail(message.guild.iconURL())
                client.channels.cache.get(channel_log_kick.id).send({ embeds: [embed_logs_kick_fail]});
            }
        } else {
            var member = message.mentions.members.first();
            member.kick().then((member) => {
                message.channel.send("**" + member.displayName + "** vient de se faire `kick` par <@" + message.author.id + ">");
                if (log_kick == 1) {
                    const embed_logs_kick = new MessageEmbed()
                        .setColor("DARK_GREY")
                        .setTitle(message.guild.name +" **LOGS KICK**")
                        .setDescription("<@" + message.author.id + "> viens de kick " + member.displayName)
                        .setFooter("Coded by MisTrou")
                        .setThumbnail(message.guild.iconURL())
                    client.channels.cache.get(channel_log_kick.id).send({ embeds: [embed_logs_kick]});
                }
            }).catch(() => {
                message.channel.send("Je n'ai pas les perms pour kick <@" + member_mention + ">");
                if (log_kick == 1) {
                    const embed_logs_kick_fail = new MessageEmbed()
                        .setColor("DARK_GREY")
                        .setThumbnail(message.guild.iconURL())
                        .setTitle(message.guild.name +" **LOGS KICK")
                        .setDescription("<@" + message.author.id + "> à essayé de kick " + member.displayName)
                        .setFooter("Coded by MisTrou")
                        client.channels.cache.get(channel_log_kick.id).send({ embeds: [embed_logs_kick_fail]});
                    }
            });
        }
    }
     /*-----------------------
    |COMMANDE UNBAN UN MEMBRE|
    ------------------------*/
    if (message.content.startsWith("&unban") && message.member.roles.cache.has(wl_role)) {
        const member_id = message.content.slice('&unban'.length).replace(/^\s+/gm, '');
        if (member_id == null) {
            return;
        }
        message.guild.members.unban(member_id).then(usr => {
            if (log_unban == 1) {
                const embed_unban_sucess = new MessageEmbed()
                    .setColor("DARK_GOLD")
                    .setThumbnail(message.guild.iconURL())
                    .setTitle(message.guild.name +" **LOGS UNBAN**")
                    .setDescription("<@" + message.author.id + "> à viens d'unban " + member.displayName)
                    .setFooter("Coded by MisTrou")
                    client.channels.cache.get(channel_log_unban.id).send({ embeds: [embed_unban_sucess]});
            }
            return message.channel.send("<@" + member_id + "> à été `unban`");
        }).catch(err => {
                if(err) {
                    if (log_unban == 1) {
                        const embed_unban_failure = new MessageEmbed()
                            .setColor("DARK_GOLD")
                            .setThumbnail(message.guild.iconURL())
                            .setTitle(message.guild.name +" **LOGS UNBAN**")
                            .setDescription("<@" + message.author.id + "> à essayé d'unban <@" + member_id + ">")
                            .setFooter("Coded by MisTrou")
                            client.channels.cache.get(channel_log_unban.id).send({ embeds: [embed_unban_failure]});
                    }
                } return message.channel.send("<@" + member_id +"> n'est plus **banni**");
            })
    }
    /*----------------------
    |COMMANDE BAN UN MEMBRE|
    ----------------------*/
    if (message.content.startsWith("&ban") && message.member.roles.cache.has(wl_role)) {
        const member_mention = message.mentions.users.first();
        if (member_mention == null) {
            return;
        }
        const memberTarget = message.guild.members.cache.get(member_mention.id);
        if (memberTarget.roles.cache.has(wl_role)) {
            message.channel.send("<@" + message.author.id + "> cette personne est dans la <@&" + wl_role + "> JE NE PEUX PAS LA BAN").then(msg => {
                setTimeout(() => msg.delete(), 10000)
              })
            if (log_ban == 1) {
                const embed_logs_ban_fail = new MessageEmbed()
                    .setColor("DARK_NAVY")
                    .setTitle(message.guild.name +" **LOGS BAN**")
                    .setDescription("<@" + message.author.id + "> à essayé de ban <@" + member_mention + ">")
                    .setFooter("Coded by MisTrou")
                    .setThumbnail(message.guild.iconURL())
                client.channels.cache.get(channel_log_ban.id).send({ embeds: [embed_logs_ban_fail]});
            }
        } else {
            var member = message.mentions.members.first();
            member.ban().then((member) => {
                message.channel.send("**" + member.displayName + "** vient de se faire `ban` par <@" + message.author.id + ">" + "https://cdn.discordapp.com/emojis/891577988892721162.gif?size=96&quality=lossless");
                if (log_ban == 1) {
                    const embed_logs_ban = new MessageEmbed()
                        .setColor("DARK_NAVY")
                        .setTitle(message.guild.name +" **LOGS BAN**")
                        .setDescription("<@" + message.author.id + "> viens de ban " + member.displayName)
                        .setFooter("Coded by MisTrou")
                        .setThumbnail(message.guild.iconURL())
                    client.channels.cache.get(channel_log_ban.id).send({ embeds: [embed_logs_ban]});
                }
            }).catch(() => {
                message.channel.send("Je n'ai pas les perms pour ban <@" + member_mention + ">");
                if (log_ban == 1) {
                    const embed_logs_ban_fail = new MessageEmbed()
                        .setColor("DARK_NAVY")
                        .setThumbnail(message.guild.iconURL())
                        .setTitle(message.guild.name +" **LOGS BAN")
                        .setDescription("<@" + message.author.id + "> à essayé de ban " + member.displayName)
                        .setFooter("Coded by MisTrou")
                    client.channels.cache.get(channel_log_ban.id).send({ embeds: [embed_logs_ban_fail]});
                }
            });
        }
    }
    /*---------------------------
    |COMMANDE CHECK LA WHITELIST|
    ---------------------------*/
    if (message.content == "&wl" && message.member.roles.cache.has(wl_role)) {
        const embed_check_wl = new MessageEmbed()
            .setTitle("**Vérification de la WhiteList**")
            .setThumbnail("https://media.giphy.com/media/gUCDHxamnl2CLYD5Dv/giphy.gif")
            .setDescription(message.guild.roles.cache.get(wl_role).members.map(m=>m.user.tag).join("\n"))
        message.channel.send({ embeds : [embed_check_wl] });
    }
    /*---------------------------------------------------------------------
       ____ ___  __  __ __  __    _    _   _ ____  _____   __           __
      / ___/ _ \|  \/  |  \/  |  / \  | \ | |  _ \| ____| | _|    _    |_ |
     | |  | | | | |\/| | |\/| | / _ \ |  \| | | | |  _|   | |   _| |_   | |
     | |__| |_| | |  | | |  | |/ ___ \| |\  | |_| | |___  | |  |_   _|  | |
      \____\___/|_|  |_|_|  |_/_/   \_\_| \_|____/|_____| | |    |_|    | |
                                                          |__|         |__|
    ----------------------------------------------------------------------*/
    /* modify */
    /*-------------
    |COMMANDE HELP|
    -------------*/
    if (message.content == "+help") {
        const embed = new MessageEmbed()
            .setColor("DARK_AQUA")
            .setTitle("[+] " + message.guild.name)
            .setFooter("Coded by MisTrou")
            .setThumbnail(message.guild.iconURL())
            .setDescription("**:game_die: Roll**\n*__Roll a dice and give a result between 1 and the <number>__*\n`+roll <nombre>`\n\n**👑 Owner**\n*__Ping my creator__*\n`+owner`\n\n**:eyes: Pic**\n*__Permet de voir la photo de profil d'un utilisateur__*\n `+pic <mention>`\n\n📧 **Invit**\nPermet de générer une invitation pour le inviter le bot\n`+invit`")
        message.channel.send({ embeds: [embed] });
    }
    /*---------------
    |COMMANDE INVITE|
    ---------------*/
    if (message.content == "+invit") {
        const embed = new MessageEmbed()
            .setColor("DARK_AQUA")
            .setTitle("[+] " + message.guild.name)
            .setFooter("Coded by MisTrou")
            .setThumbnail(message.guild.iconURL())
            .setDescription("https://discord.com/api/oauth2/authorize?client_id=942225834494808125&permissions=8&scope=bot")
        message.channel.send({ embeds: [embed] });
    }
    /*-------------
    |COMMANDE PIC |
    -------------*/
    if (message.content.startsWith("+pic")) {
        const user = message.mentions.users.first();
        if (user == null) {
            return;
        }
        const embed_pic = new MessageEmbed()
            .setAuthor(user.username)
            .setColor("FUCHSIA")
            .setImage(user.avatarURL());
        message.channel.send({embeds : [embed_pic] });
    }
    /*--------------
    |COMMANDE OWNER|
    --------------*/
    if (message.content == "+owner") {
        message.channel.send("<@474143573928050710> 👑");
    }
    /*----------------------
    |COMMANDE POUR LES ROLL|
    ----------------------*/
    if (message.content.startsWith("+roll") && message.content != "+roll") {
        let num = message.content.slice('+roll'.length).replace(/^\s+/gm, '');
        number_int = parseInt(num);
        if (!isNaN(number_int)) {
            if (message.member.roles.cache.has("942381804567019550")) {
                number_int = parseInt(Math.random()*((number_int + 1)-(number_int / 2))+(number_int / 2));
            }
            else {
                number_int = parseInt(Math.random()*((number_int + 1)-1)+1);
            }
            const embed_roll = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(message.guild.name +" **LOGS ROLL**")
                .setAuthor(message.author.tag, "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".gif")
                .setFooter("Coded by MisTrou")
                .setDescription( ":game_die: " + 'You rolled **' + number_int + "**")
            message.channel.send({ embeds : [embed_roll] });
            if (log_roll == 1) {
                await client.channels.cache.get(channel_log_roll.id).send({ embeds: [embed_roll]});
            }
        }
    }
});

client.on('guildMemberAdd', guildMember => {
    const embed_welcome = new MessageEmbed()
        .setColor("#FF9900")
        .setFooter("Coded by MisTrou")
        .setDescription("Bienvenue à <@" + guildMember.id + ">")
        .setThumbnail("https://cdn.discordapp.com/attachments/947974277691473920/948245206866735124/logo_kawa.png");
    guildMember.guild.channels.cache.get("948358220123090994").send({ embeds: [embed_welcome] });
});

client.login(process.env.BOT_TOKEN);