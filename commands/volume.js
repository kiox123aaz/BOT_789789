const { canModifyQueue, LOCALE } = require("../util/neiUtill");
const i18n = require("i18n");

module.exports = {
  name: "volume",
  aliases: ["v"],
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("ยังไม่เล่นเพลง").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("เข้าห้องเส").catch(console.error);

    if (!args[0]) return message.reply(`🔊 The current volume is: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("ใช้ตัวเลข").catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0)
      return message.reply("ใส่ตัวเลข 0-100").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    return queue.textChannel.send(`ระดับเสียง: **${args[0]}%**`).catch(console.error);
  }
};