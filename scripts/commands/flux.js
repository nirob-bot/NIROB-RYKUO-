const axios = require("axios");

module.exports.config = {
  name: "flux", // Command name
  version: "2.0.0", // Command version
  permission: 0, // Permission level (0: all)
  credits: "Dipto", // Creator of the code
  description: "Flux Image Generator", // Command description
  prefix: false, // Use prefix (true/false)
  premium: false, // Enable premium feature (true/false)
  category: "Image Generator", // Command category
  usages: "flux [prompt] --ratio 1024x1024", // Command usage
  cooldowns: 15 // Cooldown in seconds
};

module.exports.run = async ({ api, event, args }) => {
  const dipto = "https://www.noobs-api.rf.gd/dipto";

  try {
    const prompt = args.join(" ");
    const [prompt2, ratio = "1:1"] = prompt.includes("--ratio")
      ? prompt.split("--ratio").map(s => s.trim())
      : [prompt, "1:1"];

    const startTime = Date.now();

    const waitMessage = await api.sendMessage("Generating image, please wait... 😘", event.threadID);
    api.setMessageReaction("⌛", event.messageID, () => {}, true);

    const apiurl = `${dipto}/flux?prompt=${encodeURIComponent(prompt2)}&ratio=${encodeURIComponent(ratio)}`;
    const response = await axios.get(apiurl, { responseType: "stream" });

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

    api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.unsendMessage(waitMessage.messageID);

    api.sendMessage({
      body: `Here's your image (Generated in ${timeTaken} seconds)`,
      attachment: response.data,
    }, event.threadID, event.messageID);

  } catch (e) {
    console.error(e);
    api.sendMessage("Error: " + e.message, event.threadID, event.messageID);
  }
};
