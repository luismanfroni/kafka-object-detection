const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

var handler = (objects, tweet) => {};
exports.handler = handler;

const handleImage = (tweetObject) => {
    client.objectLocalization(tweetObject.url).then(result => {
        let [response] = result;
        
        if(response == null) return;

        let detectedObjects = response.localizedObjectAnnotations;

        if(detectedObjects.length == 0) return;

        exports.handler(detectedObjects, tweetObject);
    }).catch( 
        () => console.log(`Error ocurred on object detection`)
    );
    
};

exports.handleImage = handleImage;