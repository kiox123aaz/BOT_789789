const Discord = require("discord.js")
const db = require("quick.db")
const { PREFIX } = require("../config.json")

module.exports = {
  name: "prefix",
  async execute(message, args) {
    
    let embed = new Discord.MessageEmbed()
    .setDescription(`✅ ทำการเซ็ต Prefix สำหรับเซิร์ฟเวอร์นี้เป็น ${args[0]} แล้ว`)
    .setColor(`BLUE`)
    //PERMISSION
   if(!message.member.hasPermission(`ADMINISTRATOR`)) {
      return message.channel.send(":x: คุณไม่มีสิทธิ์เข้าถึงในส่วนนี้")
   }
    
   if(!message.author.id === "714822773947498578") {
      return message.channel.send(":x: คุณไม่มีสิทธิ์เข้าถึงในส่วนนี้")
   }
    
    if(!args[0]) {
      return message.channel.send(`:warning: กรุณาใส่ Prefix ที่ต้องการ`)
    } 
    
    if(args[1]) {
      return message.channel.send(`:x: ไม่สามารถเซ็ต Prefix สองรอบพร้อมกันได้`)
    }
    
    if(args[0].length > 2) {
      return message.channel.send(`:x: ไม่สามารถใช้ Prefix ได้เกิน 3 ตัวอักษร`)
    }
    
    db.set(`prefix_${message.guild.id}`, args[0])
  await message.channel.send(embed)
    
  }
}