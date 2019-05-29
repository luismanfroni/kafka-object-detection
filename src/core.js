module.exports.start = (configuration) => {
    let repository = require('./service/database');
    repository.initDatabase(configuration.databasePath);
    require('./handler/tweet').start(configuration.kafkaConfig);
};

