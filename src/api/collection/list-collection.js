const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    const params = {
        TableName : process.env.TableName
    };

    DocumentClient.scan(params, function(err, data) {
        if(err) callback(err);
        else {
            const collections = new Set();
            data.Items.forEach((item) => {
                collections.add(item.collection_name);
            });
            callback(undefined, Array.from(collections));
        }
    });
};