const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('Yo boi!!'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);

const Discord = require("discord.js");
const db = require("quick.db");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();


/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async message => {
  console.log(`เชื่มต่อกับ ${client.user.tag}แล้ว!`);
  if (message.author.bot) return;
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = PREFIX;
  if (message.content === `<@${client.user.id}>`) {
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `• Prefix: \`${prefix}\`
• Help command: \`${prefix}help\``
        )
        .setColor(`GOLD`)
    );
  }
  setInterval(function() {
    let activity = [`🤖 Kapooz`];
    let activityTypes = ["PLAYING"];
    let randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    let randomName = activity[Math.floor(Math.random() * activity.length)];
    client.user.setActivity(randomName, {
      type: randomType,

    });
  }, 2000);
  if (message.content.startsWith(prefix)) {
    if (message.content.startsWith(prefix)) {
      if (!message.content.startsWith(prefix)) return;
      const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/);
      const commandName = args.shift().toLowerCase();

      const command =
        client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      if (!command) return;

      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 1) * 1000;

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply(
            `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${
              command.name
            }\` command.`
          );
        }
      }

      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

      try {
        command.execute(message, args, client);
      } catch (error) {
        console.error(error);
        message.reply("There was an error executing that command.").catch(console.error);
      }
    }
  }
});
