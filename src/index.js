import React from 'react';
import ReactDOM from "react-dom/client"
import './index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://podcasts.morpheus-creations.com/graphql',
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
