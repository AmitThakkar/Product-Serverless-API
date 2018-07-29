#!/usr/bin/env bash

echo "Creating Product Serverless Stack ..."
aws cloudformation deploy --stack-name product-serverless --template-file ./cloud-formation/product_serverless.json --capabilities CAPABILITY_NAMED_IAM
echo "Stack Created!"

echo "Preparing sample data in DynamoDB Format..."
node src/feed-sample-data.js
echo "DynamoDB sample data prepared."