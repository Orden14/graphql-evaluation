import gql from "graphql-tag";

export const typeDefs = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        createUser(username: String!, password: String!): CreateUserResponse,
        signIn(username: String!, password: String!): SignInUserResponse
    }

    type User {
        id: ID!
        username: String!
    }

    type CreateUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: User
    }

    type SignInUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        token: String
    }
`;
