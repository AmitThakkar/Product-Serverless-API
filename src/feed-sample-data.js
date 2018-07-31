const fs = require('fs');
const AWS = require('aws-sdk');
const sampleInputData = require('../data/products.json');
const uuidv1 = require('uuid/v1');

const AWS_REGION = process.argv[2];
const TABLE_NAME = process.argv[3];

AWS.config.update({
    region: AWS_REGION
});

feedDataToDynamoDBFromSampleData(sampleInputData);

function getTableName(collectionName, size) {
    return TABLE_NAME;
}

function feedDataToDynamoDBFromSampleData(sampleData) {
    if(!sampleData) {
        return new Error("Sample Data File Not Found!");
    }

    const DocumentClient = new AWS.DynamoDB.DocumentClient();
    sampleData.forEach((collectionData) => {
        const TABLE_NAME = getTableName(collectionData.collection, collectionData.size);

        collectionData.products.forEach((product) => {
            const productDocument = {
                TableName: TABLE_NAME,
                Item: {
                    id: uuidv1(),
                    collection_name: collectionData.collection,
                    size: collectionData.size,
                    image: product.image,
                    product_name: product.name,
                    sku: product.sku
                }
            };

            DocumentClient.put(productDocument, function(err, data) {
               if (err) console.error("Unable to add product", product.name, product.sku, ". Error JSON:", JSON.stringify(err, null, 2));
            });
        });
    });
}