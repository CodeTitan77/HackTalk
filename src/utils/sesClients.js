const  { SESClient } = require ("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-southeast-2";
// Create SES service object.
const sesClient = new SESClient({ region: REGION,credentials:{
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey:process.env.SES_SECRET
} });
module.exports= { sesClient };