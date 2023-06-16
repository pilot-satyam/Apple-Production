const fs = require('fs');
const jwt = require('jsonwebtoken');

// Read the private key
const privateKey = fs.readFileSync("privateKey.pem");

// Header
const header = {
  typ: 'JWT',
  alg: 'ES256',
  kid: 'SC2W85W7RY'
};

// Payload
const payload = {
  iss: '69a6de7e-1195-47e3-e053-5b8c7c11a4d1',
  aud: 'appstoreconnect-v1',
  iat: Math.floor(Date.now() / 1000), // Set the current time as the issued at time
  exp: Math.floor(Date.now() / 1000) + (20 * 60), // Set the expiration time as 20 minutes from now
  bid: 'com.chopraglobal.chopra'
};

// Sign the token
const token = jwt.sign(payload, privateKey, { header });

console.log(token);
