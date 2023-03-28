require('dotenv').config();
const {App} = require('@slack/bolt');

const app = new App({
    socketMode: true, //remove this line if using evernts
    token: process.env.BOT_TOKEN,
    appToken: process.env.SLACK_TOKEN,
    signingSecret: process.env.SIGNING_TOKEN
});

const sendMessage = async() => {
    try {
        await app.client.chat.postMessage({
            token: process.env.BOT_TOKEN,
            channel: '#general',
            text: 'Time to check in!',
            blocks:[{
                "type":"section",
                "accessory": {
                    "type": "button",
                    "text": {
                        "type":"plain_text",
                        "text":"Click Me"
                    },
                    "action_id": "click"
                }
            }]
        })
    } catch(error) {
        console.error(error);
    }
}

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log("Bolt app is running!");
    sendMessage();
})();