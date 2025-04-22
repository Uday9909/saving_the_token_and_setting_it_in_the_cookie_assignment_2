const jwt = require('jsonwebtoken');

const secret = 'your-256-bit-secret'; // Replace with your actual secret key

const encrypt = (payload, secretKey = secret, expiresIn = '1h') => {
  // Create a JWT token with payload and expiry time
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error('Error creating token:', error);
    return null;
  }
};

// Function to verify token and handle expiry
const verifyToken = (token, secretKey = secret) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Token is valid:', decoded);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token has expired');
    } else {
      console.error('Token verification failed:', error.message);
    }
    return null;
  }
};

// Test the implementation by generating a token and verifying it
const testJWT = () => {
  const payload = { userId: 123, username: 'testuser' };
  const token = encrypt(payload, secret, '10s'); // Token expires in 10 seconds
  console.log('Generated Token:', token);

  // Verify immediately
  verifyToken(token, secret);

  // Verify after 12 seconds to test expiry handling
  setTimeout(() => {
    verifyToken(token, secret);
  }, 12000);
};

testJWT();

module.exports = encrypt;
