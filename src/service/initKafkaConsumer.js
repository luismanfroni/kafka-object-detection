var kafka = require("kafka-node"),
    Consumer = kafka.Consumer;

var handler = (message) => {  };
exports.handler = handler;

const consumer = (config) => {
    let client = new kafka.KafkaClient({ kafkaHost: config.host });
    let objConsumer = new Consumer(
        client,
        [{ topic: config.topic, partition: 0 }],
        {
            autoCommit: false
        }
    );
    objConsumer.on('message', function(message) { exports.handler(message); });
    objConsumer.on("error", (error) => console.log(`Error Ocurred: ${ error }`));
};

exports.consumer = consumer;

