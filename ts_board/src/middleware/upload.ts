import multer from "multer";
import multerS3 = require("multer-s3");
import aws from "aws-sdk";

const s3 = new aws.S3({
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: "ap-northeast-2"
});

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "tsboard",
        acl: 'public-read',
        key: function(req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        }
    })
});