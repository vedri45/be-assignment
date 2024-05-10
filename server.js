const express = require('express');
require('dotenv').config();

const app = express();
const router = require('./src/route');
const { auth } = require('express-openid-connect');

const config = {
    authRequired: true,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:3000',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    authorizationParams: {
        response_type: 'id_token',
        scope: 'openid profile email offline_access',
    },
};

const port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
    config.baseURL = `http://localhost:${port}`;
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(express.json());
app.use('/', router);
app.listen(port, () => {
    console.log(`Listening on ${config.baseURL}`);
});