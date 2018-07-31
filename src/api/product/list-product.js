const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    const params = {
        TableName : process.env.TableName,
    };

    if(true) {
        params.FilterExpression = "#size = :size";
        params.ExpressionAttributeNames = {
            "#size": "size"
        };
        params.ExpressionAttributeValues = {
            ":size": 28
        };
        params.ProjectionExpression = "id, product_name"
    }

    DocumentClient.scan(params, function(err, data) {
       if(err) callback(err);
       else callback(undefined, data.Items);
    });
};