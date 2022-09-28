const Discord = require("discord.js");
const fs = require("fs");
const core = require('@actions/core');


function breakDiscordWebhook(webhook) {
    const array = webhook.split("/");
    const length = array.length;
    if (length < 3) throw new Error("Webhook probably misrepresented");

    if (array[length - 1] == "github") {
        return { id: array[length - 3], token: array[length - 2] };
    }

    return { id: array[length - 2], token: array[length - 1] };
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

function postToDiscord(webhook) {

    const { id, token } = breakDiscordWebhook(webhook);
    const webhookClient = new Discord.WebhookClient(id, token);


    let sender;

    const senders = JSON.parse(core.getInput('characters'));

    sender = senders[Object.keys(senders)[getRandomInt(0,Object.keys(senders).length)].toString()];
        
    webhookClient
    .send({
        username: sender.name.toString(),
        avatarURL: sender.url.toString(),
        content: "@everyone " + sender.content.toString(),
    })
    .catch(console.error);


    

    webhookClient.destroy();
};

module.exports = { postToDiscord }