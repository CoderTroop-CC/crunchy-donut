module.exports = {
    AUTH0_DOMAIN: 'ranotes.auth0.com', // e.g., kmaida.auth0.com
    AUTH0_API_AUDIENCE: 'http://localhost:8083/api/', // e.g., 'http://localhost:8083/api/'
    MONGO_URI: process.env.MONGO_URI || 'mongodb://dbuser:dbuser1@ds141786.mlab.com:41786/ranotes',
    NAMESPACE: 'http://ranotes.com/roles'
  };