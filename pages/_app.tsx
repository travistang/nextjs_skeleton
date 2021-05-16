import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import getClient from '../gql-client'

export default function App({ Component, pageProps }) {
  const client = getClient();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}