import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://food-burger.vercel.app/api",
  cache: new InMemoryCache()
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);