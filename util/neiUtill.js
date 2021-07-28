module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {
      member.send("คุณต้องเข้าห้องเสียงก่อนครับ!").catch(console.error);
      return false;
    }

    return true;
  }
};
