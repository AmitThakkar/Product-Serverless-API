const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    const params = {
        TableName : "Product",
    };

    DocumentClient.scan(params, function(err, data) {
       if(err) callback(err);
       else callback(undefined, data.Items);
    });
};