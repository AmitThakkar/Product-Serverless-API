#!/usr/bin/env bash

AWS_REGION=$1
LAMBDA_SRC_BUCKET_NAME="product-serverless-src"
ZIP_FILE_NAME="product-api-$(date --utc +%Y-%m-%dT%H-%M-%SZ).zip"
LAMBDA_SRC_BUCKET_KEY="src/${ZIP_FILE_NAME}"
TABLE_NAME="Product"

#Before Creating Lambda Functions, Source zip should be in S3 Bucket so creating s3 bucket first in different Stack.
echo "Creating src bucket stack ..."
aws cloudformation deploy \
    --region ${AWS_REGION} \
    --stack-name product-stateful \
    --template-file ./cloud-formation/product-stateful.json \
    --parameter-overrides \
        S3BucketName=${LAMBDA_SRC_BUCKET_NAME} \
        TableName=${TABLE_NAME}\
    --tags ApplicationName=ProductionServerless SampleApplication=FeelFreeToDeleteMe

echo "Zipping the source code ..."
zip -r ${LAMBDA_SRC_BUCKET_KEY} src/api/

echo "Uploading Lambda src to S3 ..."
aws s3 cp ${LAMBDA_SRC_BUCKET_KEY} s3://${LAMBDA_SRC_BUCKET_NAME}/src/

echo "Feeding sample data in DynamoDB Format ..."
npm i
node src/feed-sample-data.js ${AWS_REGION} ${TABLE_NAME}

echo "Creating Product Serverless Stack ..."
aws cloudformation deploy \
    --region ${AWS_REGION} \
    --stack-name product-stateless \
    --template-file ./cloud-formation/product-stateless.json \
    --parameter-overrides \
        S3BucketName=${LAMBDA_SRC_BUCKET_NAME} \
        S3BucketKey=${LAMBDA_SRC_BUCKET_KEY} \
        TableName=${TABLE_NAME}\
    --capabilities CAPABILITY_NAMED_IAM \
    --tags ApplicationName=ProductionServerless SampleApplication=FeelFreeToDeleteMe

echo "Removing src zip file"
rm -rf ${LAMBDA_SRC_BUCKET_KEY}