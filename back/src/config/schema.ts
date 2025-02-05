import gql from "graphql-tag";

export const typeDefs = gql`
    type Query {
        getArticles: [Article]
        getArticle(id: ID!): Article
    }

    type Mutation {
        createUser(username: String!, password: String!): CreateUserResponse,
        signIn(username: String!, password: String!): SignInUserResponse
        createArticle(title: String!, content: String!): ArticleResponse
        updateArticle(id: ID!, title: String, content: String): ArticleResponse
        deleteArticle(id: ID!): ArticleResponse
        likeArticle(id: ID!): LikeResponse
        commentArticle(articleId: ID!, content: String!): CommentResponse
    }

    type User {
        id: ID!
        username: String!
    }

    type Article {
        id: ID!
        title: String!
        content: String!
        author: User!
        comments: [Comment]
        likes: [Like]
    }

    type Comment {
        id: ID!
        content: String!
        author: User!
        article: Article!
    }

    type Like {
        id: ID!
        user: User!
        article: Article!
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

    type ArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
        article: Article
    }

    type LikeResponse {
        code: Int!
        success: Boolean!
        message: String!
        like: Like
    }

    type CommentResponse {
        code: Int!
        success: Boolean!
        message: String!
        comment: Comment
    }
`;
