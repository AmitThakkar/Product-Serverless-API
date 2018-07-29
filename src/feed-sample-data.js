const fs = require('fs');
const AWS = require('aws-sdk');
const sampleInputData = require('../data/products.json');

AWS.config.update({
    region: "eu-west-2"
});

feedDataToDynamoDBFromSampleData(sampleInputData);

function getTableName(collectionName, size) {
    if(!collectionName || !size) {
        return new Error("CollectionName or Size missing!");
    }
    return (collectionName.charAt(0).toUpperCase() + collectionName.slice(1))
            .replace(/(\-\w)/g, function(m){return m[1].toUpperCase();}) + size
}

function feedDataToDynamoDBFromSampleData(sampleData) {
    if(!sampleData) {
        return new Error("Sample Data File Not Found!");
    }

    const DocumentClient = new AWS.DynamoDB.DocumentClient();
    sampleData.forEach((collectionData, collectionIndex) => {
        const TABLE_NAME = getTableName(collectionData.collection, collectionData.size);

        collectionData.products.forEach((product, productIndex) => {
            const productDocument = {
                TableName: TABLE_NAME,
                Item: {
                    id: (collectionIndex + 1) + "-" + (productIndex + 1),
                    image: product.image,
                    name: product.name,
                    sku: product.sku
                }
            };

            DocumentClient.put(productDocument, function(err, data) {
               if (err) console.error("Unable to add product", product.name, product.sku, ". Error JSON:", JSON.stringify(err, null, 2));
            });
        });
    });
}