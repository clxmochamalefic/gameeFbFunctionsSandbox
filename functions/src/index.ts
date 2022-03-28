import * as functions from "firebase-functions";
import {Client, Intents} from "discord.js";

const myServerId = "<DISCORD_SERVER_ID>";
const token = "<DISCORD_BOT_TOKEN>";

const client = new Client({intents: [Intents.FLAGS.GUILDS]});
client.on("ready", () => {
  functions.logger.log(client?.user?.tag);
  const myServer = client.guilds.cache.get(myServerId);
  myServer?.channels.create("TestVoicChannel", {
    type: "GUILD_VOICE",
  });
  functions.logger.log("Create Voice Channel");
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.createVoiceChannel = functions.https.onRequest((request, response) => {
  response.send(client?.user?.tag);
  client.login(token).then((value) => {
    functions.logger.log("logged in");
  }).catch((error) => {
    functions.logger.log("login failure" + error);
  });
  response.send("AAAA");
});
