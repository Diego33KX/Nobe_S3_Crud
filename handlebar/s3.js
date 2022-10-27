const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const getBuckets = () => {
    return storage.listBuckets().promise();
};

const uploadToBucket = (bucketName,file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket:bucketName,
        Key:file.name,
        Body:stream
    };
    return storage.upload(params).promise();
};

const deleteObject = (params) => {
    storage.deleteObject(params, function(err, data){
        if(err){
            console.log(err, err.stack);  // error
        }else{
            console.log('Eliminado correctamente');
        } 
    })
}

module.exports = {
    getBuckets,
    uploadToBucket,
    deleteObject
};