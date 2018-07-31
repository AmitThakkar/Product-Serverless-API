const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    const params = {
        TableName : process.env.TableName,
    };

    const CollectionName = event.collection_name;

    if(!CollectionName) {
        callback(new Error("Collection name is missing into query string!"));
    }
    params.FilterExpression = "#collection_name = :collection_name";
    params.ExpressionAttributeNames = {
        "#collection_name": "collection_name"
    };
    params.ExpressionAttributeValues = {
        ":collection_name": CollectionName
    };

    DocumentClient.scan(params, function(err, data) {
       if(err) callback(err);
       else callback(undefined, data.Items);
    });
};