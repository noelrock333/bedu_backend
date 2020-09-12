const AWS = require('aws-sdk');
require('dotenv').config();

const { AWS_ACCESS_KEY_ID, AWS_SECRET_KEY, S3_BUCKET_NAME } = process.env;

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY
});

const params = {
  Bucket: S3_BUCKET_NAME,
  CreateBucketConfiguration: {
    // Set your region here
    LocationConstraint: "eu-west-1"
  }
};

s3.createBucket(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else console.log('Bucket Created Successfully', data.Location);
});


/** 
  * Pólitica de bitbucket
  
  {
    "Version": "2008-10-17",
    "Statement": [
      {
        "Sid": "AllowPublicRead",
        "Effect": "Allow",
        "Principal": {
          "AWS": "*"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::bedu-travels/*"
      }
    ]
  }
**/