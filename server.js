// Express server logic
const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();

app.use('/graphql', expressGraphQL({
  graphiql: true, //Could disabled on prod?
}));

app.use('/healthcheck', (req, res) => res.status(200).send('Healthy.'));

app.listen(4000, () => console.log('Listening...'));
