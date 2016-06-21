# Football GraphQL test server

A demo wrapper around [http://pads6.pa-sport.com/](PADS API) built using GraphQL.

Support next queries:
 - match: match info
 - matches: list of matches
 - actions: list of match actions

Checkout [https://github.com/itsmepetrov/football-react-native-test-client](football-react-native-test-client) - React Native demo client for this server

### Getting Started

```sh
$ npm install
$ redis-server
$ npm start
```

### Development

```sh
$ redis-server
$ npm run start:dev
```

Launch your favorite web browser and go to [http://localhost:5000/graphql](http://localhost:5000/graphql) for GraphiQL interface.
