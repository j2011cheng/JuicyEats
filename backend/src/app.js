const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

// components
const listing = require('./listing');
const user = require('./user');
const auth = require('./auth');

const errorHandler = require('./errorHandler');
const corsOptions = require('../config/corsOptions');
const mongoConnect = require('../config/mongoConnection');

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoConnect();

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

// routes
app.get('/v0/listings', listing.getListings);
app.get('/v0/listing/:id', listing.getListing);
app.post('/v0/listing', auth.check, listing.postListing);
app.patch('/v0/listing/:id', listing.updateListing);
app.delete('/v0/listing/:id', listing.deleteListing);
app.get('/v0/users', user.getUsers);
app.get('/v0/users/:id', user.getUser);
app.post('/v0/users', user.postUser);
app.patch('/v0/users/:id', auth.check, user.updateUser);
app.delete('/v0/users/:id', auth.check, user.deleteUser);
app.post('/v0/authenticate', auth.login);
app.get('/v0/authenticate/refresh', auth.refresh);
app.post('/v0/authenticate/logout', auth.logout);

app.use(errorHandler);

module.exports = app;
