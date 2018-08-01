# Product Serverless API

This is a serverless sample application for Product Collection API. I am using AWS as a cloud provider for this.

## What all tool we need to run this?
1. Git
2. AWS-CLI
3. NodeJS
4. A Tool/tar to zip source code.

## Why these tools?
1. Git: I am using Git to version control of source code.
2. AWS-CLI: I am creating serverless application and for this I am using AWS as Cloud Provider.
3. NodeJS: I am writing AWS Lambda functions in NodeJS.
4. Zip Tool: I need this tool to zip source code before uploading to S3.

## How To Deploy?
1. First of all, Make sure **GIT**, **NodeJS** and **AWS-CLI** are installed.
2. Clone source code with below command:

    `git clone git@github.com:AmitThakkar/Product-Serverless-API.git`
    
    or Download ZIP from [here](https://github.com/AmitThakkar/Product-Serverless-API/archive/master.zip)
3. In case, you have downloaded the ZIP file, extract it.
4. Go to extracted Directory or Clone Directory with below command:
    
    `cd Product-Serverless-API`
5. Make sure you have access to your AWS Account, if not you can configure credentials by running `aws configure`.
6. Run deploy.sh as:

    `./deploy.sh eu-west-2`

That it. 

> Take rest and watch logs. This process is completely transparent so whatever `deploy.sh` and `cloudformation` will do
will put into logs on console.

PS: If you get any error regarding access, please check your IAM policies.

## How To Test?

Login into AWS Console, go to API Gateway service and you will find all the apis in **London** region under ProductionAPI.

> If you find any challenge/issue please let me know at vigildbest@gmail.com.

### TODO: Improvement
1. AWS Lambda role access policies can be improve.
2. DLQ Implementation for Lambda.
3. Encryption for source code.
4. DynamoDB Global Secondary Indexes should be implemented.
5. Read/Write Throughput for dynamoDB tables.
6. Better Argument Handling in `deploy.sh`
7. Better Argument Handling in `feed-sample-data.js`
8. APIGateway Implementation
9. Alarming on Lambdas
10. Alias for Lambdas
11. Error Handler in `deploy.sh`
12. Swagger integration
13. S3 Bucket cleanup
14. Delete Stack script(should empty s3 bucket first.)
15. Empty String handling while adding product.
16. Authorization.
17. List-collection implementation.