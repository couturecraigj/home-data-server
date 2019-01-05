import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
import { SchemaLink } from 'apollo-link-schema';

const createClient = (req, res) => {
  const link = new SchemaLink({
    schema: req.app.get('apolloSchema'),
    context: () => ({
      ...req.app.get('apolloSchema').context,
      req,
      db: req.db,
      res
    })
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
    ssrMode: true,
    ssrForceFetchDelay: 200,
    cache: new InMemoryCache()
  });

  return client;
};

export default createClient;
