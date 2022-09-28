const core = require('@actions/core');
const { postToDiscord } = require("./helpers/discordFunctions");

try {
  // input defined in action metadata file
  
  const discordWebhook = core.getInput('discord-webhook');


  postToDiscord(discordWebhook);

} catch (error) {
  core.setFailed(error.message);
}