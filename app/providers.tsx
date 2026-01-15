'use client';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import { setContext } from '@apollo/client/link/context';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  console.log(token, "token");
  
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);
  const httpLink = new HttpLink({
    uri: 'https://back-end-smart-content-moderation-a-alpha.vercel.app/api/server',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ReduxProvider>
  );
}
