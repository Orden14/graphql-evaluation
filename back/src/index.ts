import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {typeDefs} from './config/schema.js';
import {resolvers} from './resolvers/resolvers.js';
import db from './datasources/db.js'
import {getUser} from './modules/auth.js';

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000},
    context: async ({req}) => {
        const authorization = (req.headers.authorization)?.split('Bearer ')?.[1]
        const user = authorization ? getUser(authorization) : null
        return {
            dataSources: {
                db,
            },
            user
        }
    }
});

console.log(`🚀  Server ready at: ${url}`);
