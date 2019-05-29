require('dotenv').config();
require('./src/core').start(
    {
        databasePath: './res/data.db',
        kafkaConfig: {
            host: process.env.KAFKA_IP + ':' +  process.env.KAFKA_PORT,
            topic: process.env.KAFKA_TOPIC
        }
    }
);
