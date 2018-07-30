const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    const params = {
        TableName : "Product",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": "653d3311-940f-11e8-9599-97a0e3d1bf99"
        }
    };

    DocumentClient.query(params, function(err, data) {
       if(err) callback(err);
       else callback(undefined, data.Items);
    });
};