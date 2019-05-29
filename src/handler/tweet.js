const kafkaConsumer = require('../service/initKafkaConsumer');
const objectDetection = require('../service/objectDetection');
const dbNew = require('../service/database').new;

const start = (kafkaConfig) => {
    objectDetection.handler = (detectedObjects, tweetObject) => 
        dbNew(tweetObject, detectedObjects);
    
    kafkaConsumer.handler = (message) => {
        try {
            let tweet = JSON.parse(message.value);
            
            if(typeof(tweet.media_url) != "undefined") {
                objectDetection.handleImage(
                    {
                        "id": tweet.id,
                        "url": media.media_url,
                        "text": tweet.text
                    }
                );
            }
        } catch {

        }
    };

    kafkaConsumer.consumer(kafkaConfig);
    
};
exports.start = start;
