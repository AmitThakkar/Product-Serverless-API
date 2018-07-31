const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB();

exports.handler = function(event, context, callback) {
    const params = {
        TableName : process.env.TableName,
        Key: {
            "id": {
                "S": "4ad67310-949b-11e8-9bb2-0506917f3e9c"
            }
        }
    };

    dynamoDB.getItem(params, function(err, data) {
        if(err) callback(err);
        else callback(undefined, data.Item);
    });
};