const PubNub = require('pubnub');
const uuid = PubNub.generateUUID();
const pubnub = new PubNub({
  publishKey: "pub-c-87a605f0-1da2-4285-bd0c-ec8d871f6d01",
  subscribeKey: "sub-c-f432b954-4430-11eb-a73a-1eec528e8f1f",
  uuid: uuid
});

const publishConfig = {
  channel: "pubnub_onboarding_channel",
  message: {"sender": uuid, "content": "Hello From Node.js SDK"}
}

pubnub.addListener({
  message: function(message) {
    console.log(message);
  },
  presence: function(presenceEvent) {
    console.log(presenceEvent);
  }
})

pubnub.subscribe({
  channels: ["pubnub_onboarding_channel"],
  withPresence: true,
});

pubnub.publish(publishConfig, function(status, response) {
  console.log(status, response);
});