import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { cache } from './cache'
import App from './App';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { darkTheme } from './theme'

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
})

ReactDOM.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
