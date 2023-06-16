var jwtSecret = pm.environment.get('jwt_secret') || ''
// Set headers for JWT
var header = {
	'typ': 'JWT',
	'alg': 'ES256',
    'kid': 'SC2W85W7RY'
};

// Prepare timestamp in seconds
var currentTimestamp = Math.floor(Date.now() / 1000)

var data = {
  iss: '69a6de7e-1195-47e3-e053-5b8c7c11a4d1',
  aud: 'appstoreconnect-v1',
  iat: Math.floor(Date.now() / 1000), // Set the current time as the issued at time
  exp: Math.floor(Date.now() / 1000) + (20 * 60), // Set the expiration time as 20 minutes from now
  bid: 'com.chopraglobal.chopra'
}


function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source)
    
    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '')
    
    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-')
    encodedSource = encodedSource.replace(/\//g, '_')
    
    return encodedSource
}

// encode header
var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
var encodedHeader = base64url(stringifiedHeader)

// encode data
var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
var encodedData = base64url(stringifiedData)

// build token
var token = `${encodedHeader}.${encodedData}`

// sign token
var signature = CryptoJS.HmacSHA256(token, jwtSecret)
signature = base64url(signature)
var signedToken = `${token}.${signature}`

pm.environment.set('jwt_signed', signedToken)
console.log('Signed and encoded JWT', signedToken)