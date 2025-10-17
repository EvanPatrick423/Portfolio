'use client';

import React, { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

// Create Apollo Client instance
function makeClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
      fetchOptions: {
        cache: 'no-store',
      },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  });
}

export function ApolloWrapper({ children }) {
  // Use useMemo to prevent creating a new client on every render
  const client = useMemo(() => makeClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

