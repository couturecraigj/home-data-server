import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import Helmet from 'react-helmet';
import { createGlobalStyle } from 'styled-components';
import Layout from '../components/Layout';
import Routes from '../pages/Routes';

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    height: 100%;
    min-height: 100%;
    padding: 0;
    margin: 0;
  }
  #root {
    display: flex;
    flex-direction: column;
  }
`;

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <Layout>
      <GlobalStyle />
      <Helmet>
        <title>Dashboard Pi</title>
      </Helmet>
      <Routes />
    </Layout>
  </ApolloProvider>
);

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  client: PropTypes.any.isRequired
};

export default App;
