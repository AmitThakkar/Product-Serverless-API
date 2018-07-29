# Product Serverless API

This is a serverless sample application for Product Collection API. I am using AWS as a cloud provider for this.

##What all tool we need to run this?
1. Git
2. AWS-CLI
3. NodeJS

##Why these tools?
1. Git: I am using Git to version control of source code.
2. AWS-CLI: I am creating serverless application and for this I am using AWS as Cloud Provider.
3. NodeJS: I am writing AWS Lambda functions in NodeJS.

##How To Run?
1. First of all, Make sure **GIT**, **NodeJS** and **AWS-CLI** are installed.
2. Clone source code with below command:

    `git clone git@github.com:AmitThakkar/Product-Serverless-API.git`
    
    or Download ZIP from [here](https://github.com/AmitThakkar/Product-Serverless-API/archive/master.zip)
3. In case, you have downloaded the ZIP file, extract it.
4. Go to extracted Directory or Clone Directory with below command:
    
    `cd Product-Serverless-API`
5. Make sure you have access to your AWS Account, if not you can configure credentials by running `aws configure`.
6. Run deploy.sh as:

    `./deploy.sh`


> If you find any challenge/issue please let me know at vigildbest@gmail.com.

PS: This stack will be created into AWS `eu-west-2` region.