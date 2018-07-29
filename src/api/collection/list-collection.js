const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context, callback) {
    dynamodb.listTables({}, callback);
};