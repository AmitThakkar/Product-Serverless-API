#!/usr/bin/env bash

LAMBDA_SRC_BUCKET_NAME="product-serverless-code"
ZIP_FILE_NAME="product-api.zip"
LAMBDA_SRC_BUCKET_KEY="src/${ZIP_FILE_NAME}"

#Before Creating Lambda Functions, Source zip should be in S3 Bucket so creating s3 bucket first in different Stack.
echo "Creating src bucket stack ..."
aws cloudformation deploy \
    --stack-name product-src-bucket \
    --template-file ./cloud-formation/product-src-bucket.json \
    --parameter-overrides S3BucketName=${LAMBDA_SRC_BUCKET_NAME}\
    --tags ApplicationName=ProductionServerless SampleApplication=FeelFreeToDeleteMe

echo "Zipping the source code ..."
zip -r ${LAMBDA_SRC_BUCKET_KEY} src/api/
echo "Code Zipped"

echo "Uploading Lambda src to S3 ..."
aws s3 cp ${LAMBDA_SRC_BUCKET_KEY} s3://${LAMBDA_SRC_BUCKET_NAME}/src/
echo "Lambda src Uploaded to S3."

echo "Creating Product Serverless Stack ..."
aws cloudformation deploy \
    --stack-name product-serverless \
    --template-file ./cloud-formation/product-serverless.json \
    --parameter-overrides S3BucketName=${LAMBDA_SRC_BUCKET_NAME} S3BucketKey=${LAMBDA_SRC_BUCKET_KEY}\
    --capabilities CAPABILITY_NAMED_IAM \
    --tags ApplicationName=ProductionServerless SampleApplication=FeelFreeToDeleteMe
echo "Stack Created!"

echo "Feeding sample data in DynamoDB Format ..."
node src/feed-sample-data.js
echo "DynamoDB sample data feed."

echo "Removing src zip file"
rm -rf ${LAMBDA_SRC_BUCKET_KEY}
echo "Removed src zip file"