const fs = require("fs-extra");
const axios = require("axios");
const request = require("request");

module.exports.config = {
  name: "info",
  version: "1.0.0",
  permission: 0,
  credits: "IMRAN",
  description: "Show stylish admin information",
  prefix: true,
  category: "INFO",
  usages: "info",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "request": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  const adminInfo = {
    name: "𝗠𝗮𝗵𝗮𝗯𝘂𝗯 𝗥𝗮𝗵𝗺𝗮𝗻",
    city: "𝗗𝗵𝗮𝗸𝗮, 𝗕𝗮𝗻𝗴𝗹𝗮𝗱𝗲𝘀𝗵",
    work: "𝗪𝗲𝗯 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 & 𝗕𝗼𝘁 𝗖𝗿𝗲𝗮𝘁𝗼𝗿",
    whatsapp: "wa.me/+8801613356376",
    facebook: "https://facebook.com/www.xnxx.com140"
  };

  const botVersion = global.config.version || "2.0.0";
  const uptimeSeconds = process.uptime();
  const uptime = formatUptime(uptimeSeconds);

  const info = `
✦ 𝗠𝗔𝗛𝗔𝗕𝗨𝗕 𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢 ✦

❖ 𝗡𝗮𝗺𝗲: 『 ${adminInfo.name} 』
❖ 𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻: 『 ${adminInfo.city} 』
❖ 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻: 『 ${adminInfo.work} 』
❖ 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽: 『 ${adminInfo.whatsapp} 』
❖ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: 『 ${adminInfo.facebook} 』

╔════════ • ✤ • ════════╗
✦ 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 ✦
╚════════ • ✤ • ════════╝

❖ 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: 『 ${botVersion} 』
❖ 𝗨𝗽𝘁𝗶𝗺𝗲: 『 ${uptime} 』
❖ 𝗖𝗼𝗱𝗲𝗿: 『 ${adminInfo.name} 』
❖ 𝗙𝗿𝗮𝗺𝗲𝘄𝗼𝗿𝗸: 『 IMRAN-API 』
`.trim();

  const imagePath = __dirname + "/cache/admin.png";
  const imageURL = `https://graph.facebook.com/100014754734049/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

  request(encodeURI(imageURL))
    .pipe(fs.createWriteStream(imagePath))
    .on("close", () => {
      api.sendMessage(
        {
          body: info,
          attachment: fs.createReadStream(imagePath)
        },
        event.threadID,
        () => fs.unlinkSync(imagePath),
        event.messageID
      );
    });
};

function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (secs || parts.length === 0) parts.push(`${secs} second${secs > 1 ? "s" : ""}`);

  return parts.join(", ");
}
