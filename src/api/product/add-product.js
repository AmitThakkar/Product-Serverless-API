const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();
const uuidv1 = require('uuid/v1');

exports.handler = function(event, context, callback) {
    const params = {
        TableName : process.env.TableName,
        Item:{
            "id": uuidv1(),
            "size": event.size,
            "collection_name": event.collection_name,
            "product_name": event.product_name,
            "image": event.image,
            "sku": event.sku
        }
    };

    DocumentClient.put(params, function(err, data) {
        if (err) callback(new Error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2)));
        else callback(undefined, data);
    });
};