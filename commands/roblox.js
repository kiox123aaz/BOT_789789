const discord = require("discord.js");
const roblox = require("noblox.js");

module.exports = {
    name: "idrb",
    aliases: ["roblox"],
    async execute(message, args) {
      let username = args[0]
     if (username) {
       roblox.getIdFromUsername(username).then(id => {
         if (id) {
           roblox.getPlayerInfo(parseInt(id)).then(function(info) {
             let embed = new discord.MessageEmbed()

             .setColor("#ff0000")
             .setTimestamp()
             .setImage(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
             .setTitle(`ข้อมูลผู้เล่น Player เบื้องต้น v12`)
             .addField("\`ชื่อผู้ใช้\`", info.username || 'ผิดพลาด')
             .addField("\`เลขไอดี\`", id || 'ผิดพลาด')
             .addField("\`อายุของไอดี\`", `${info.age} วัน` || 'ผิดพลาด')
             .addField("\`ไอดีของผู้เล่น\`", `[กดที่นี่เพื่อดูข้อมูล](https://roblox.com/users/${id}/profile)`)
             .setFooter(`สั่งโดย ${message.author.tag}`)
             .setColor(`2883b6`)
              message.channel.send({embed})
           })
         }

       }).catch(function (err) {
         message.channel.send(new discord.MessageEmbed()
                             .setTitle("**ผิดพลาด**")
                             .setDescription("> ⛔ **ไม่พบผู้เล่นที่ต้องการหาครับ**")
                             .setColor(`RED`)
                             .setTimestamp())
       });
    } else {
       message.channel.send(new discord.MessageEmbed()
                           .setTitle("**ผิดพลาด**")
                           .setDescription("> ❌ **กรุณาใส่ชื่อผู้เล่นด้วยครับ**")
                           .setColor(`RED`)
                           .setTimestamp());
     }
    }}