import { ApolloClient, InMemoryCache } from '@apollo/client';

export default function getClient() {
    const client = new ApolloClient({
        uri: '/graphql',
        cache: new InMemoryCache()
    });

    return client;
}