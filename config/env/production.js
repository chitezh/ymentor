'use strict';

module.exports = {
  db: process.env.MONGOLAB_URI,
  google: {
    consumerKey: '904765489363-1d6sgdpf4vd6jee4lbtfo0i61h3rc4li.apps.googleusercontent.com',
    consumerSecret: 'fiImCAQP0RfidEHjknK4FUSf'
  },
  facebook: {
    clientID: '1655371418049551',
    clientSecret: '7556b7f9886b33f1cf9af33fe62a4d8b'
  },
  jwtSecret: 'mySecret',
  cloudinary: {
    cloud_name: 'dtpf1mle2',
    api_key: '548953239178178',
    api_secret: 'JLqmFBkh_rDjvSNJs8rBDm4MSbI'
  }
};