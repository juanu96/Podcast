import React from 'react';
import ReactDOM from "react-dom/client"
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://podcast.local/graphql',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(

  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
)

/* ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);*/
