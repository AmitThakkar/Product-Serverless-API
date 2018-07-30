const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context, callback) {
    dynamodb.listTables({}, (err, result) => {
        if(err) callback(err);
        else callback(undefined, result.TableNames);
    });
};