import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// import { SchemaLink } from 'apollo-link-schema';

const ssrForceFetchDelay = 100;
const currentState = window.__APOLLO_STATE__;
const link = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          // eslint-disable-next-line no-console
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );

        // return {
        //   graphQLErrors,
        //   networkError,
        //   message: graphQLErrors.map(({ message }) => message).join(' and ')
        // };
      }

      // eslint-disable-next-line no-console
      if (networkError) console.error(`[Network error]: ${networkError}`);
    }),
    link
  ]),
  ssrMode: false,
  ssrForceFetchDelay,
  cache: new InMemoryCache().restore(currentState)
});

export default client;
