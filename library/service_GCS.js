// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const Storage = require('@google-cloud/storage');
const Multer = require('multer');

const GCS_storage = Storage({
  projectId: 'workdone-okrssystem-cmoneypro',
  keyFilename: '../WorkDone-OKRsSystem-CMoneyPro-856a4473eb7c.json'
});
var GCS_imgBucketName = 'okrs-sys-emp-img';
var GCS_imgBucketInstance = GCS_storage.bucket(GCS_imgBucketName);


// Returns the public, anonymously accessable URL to a given Cloud Storage
// object.
// The object's ACL has to be set to public read.
// [START public_url]
function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${GCS_imgBucketName}/${filename}`;
}
// [END public_url]

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
// [START process]
function sendUploadToGCS(req, res, next) {
  if (!req.file) {
    return next();
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = GCS_imgBucketInstance.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
}
// [END process]

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
// [START multer]
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});
// [END multer]

//==================== Delete File ====================
function deleteFile(filename) {
  // [START storage_delete_file]
  // Imports the Google Cloud client library
  // const Storage = require('@google-cloud/storage');

  // Creates a client
  // const storage = new Storage();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Name of a bucket, e.g. my-bucket';
  // const filename = 'File to delete, e.g. file.txt';

  // Deletes the file from the bucket

  // storage
  //   .bucket(bucketName)
  //   .file(filename)
  //   .delete()
  //   .then(() => {
  //     console.log(`gs://${bucketName}/${filename} deleted.`);
  //   })
  //   .catch(err => {
  //     console.error('ERROR:', err);
  //   });

  GCS_imgBucketInstance
    .file(filename)
    .delete()
    .then(() => {
      console.log(`gs://${GCS_imgBucketName}/${filename} deleted.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END storage_delete_file]
}
//====================================================

module.exports = {
  deleteFile,
  getPublicUrl,
  sendUploadToGCS,
  multer
};
