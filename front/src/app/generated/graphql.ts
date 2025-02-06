import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  author: User;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likes?: Maybe<Array<Maybe<Like>>>;
  title: Scalars['String']['output'];
};

export type ArticleResponse = {
  __typename?: 'ArticleResponse';
  article?: Maybe<Article>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  article: Article;
  author: User;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Like = {
  __typename?: 'Like';
  article: Article;
  id: Scalars['ID']['output'];
  user: User;
};

export type LikeResponse = {
  __typename?: 'LikeResponse';
  code: Scalars['Int']['output'];
  like?: Maybe<Like>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentArticle?: Maybe<CommentResponse>;
  createArticle?: Maybe<ArticleResponse>;
  createUser?: Maybe<CreateUserResponse>;
  deleteArticle?: Maybe<ArticleResponse>;
  likeArticle?: Maybe<LikeResponse>;
  removeLike?: Maybe<LikeResponse>;
  signIn?: Maybe<SignInUserResponse>;
  updateArticle?: Maybe<ArticleResponse>;
};


export type MutationCommentArticleArgs = {
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};


export type MutationCreateArticleArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLikeArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveLikeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateArticleArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getArticle?: Maybe<Article>;
  getArticles?: Maybe<Array<Maybe<Article>>>;
};


export type QueryGetArticleArgs = {
  id: Scalars['ID']['input'];
};

export type SignInUserResponse = {
  __typename?: 'SignInUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type GetArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQuery = { __typename?: 'Query', getArticles?: Array<{ __typename?: 'Article', id: string, title: string, content: string, author: { __typename?: 'User', id: string, username: string }, comments?: Array<{ __typename?: 'Comment', id: string, content: string, author: { __typename?: 'User', username: string } } | null> | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', username: string } } | null> | null } | null> | null };

export type GetArticleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetArticleQuery = { __typename?: 'Query', getArticle?: { __typename?: 'Article', id: string, title: string, content: string, author: { __typename?: 'User', id: string, username: string }, comments?: Array<{ __typename?: 'Comment', id: string, content: string, author: { __typename?: 'User', username: string } } | null> | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', username: string } } | null> | null } | null };

export type CommentArticleMutationVariables = Exact<{
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type CommentArticleMutation = { __typename?: 'Mutation', commentArticle?: { __typename?: 'CommentResponse', success: boolean, message: string, comment?: { __typename?: 'Comment', id: string, content: string, author: { __typename?: 'User', id: string, username: string }, article: { __typename?: 'Article', id: string, title: string, author: { __typename?: 'User', id: string, username: string } } } | null } | null };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserResponse', success: boolean, message: string, user?: { __typename?: 'User', id: string, username: string } | null } | null };

export type SignInMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'SignInUserResponse', success: boolean, message: string, token?: string | null } | null };

export const GetArticlesDocument = gql`
    query GetArticles {
  getArticles {
    id
    title
    content
    author {
      id
      username
    }
    comments {
      id
      content
      author {
        username
      }
    }
    likes {
      id
      user {
        username
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticlesGQL extends Apollo.Query<GetArticlesQuery, GetArticlesQueryVariables> {
    override document = GetArticlesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetArticleDocument = gql`
    query GetArticle($id: ID!) {
  getArticle(id: $id) {
    id
    title
    content
    author {
      id
      username
    }
    comments {
      id
      content
      author {
        username
      }
    }
    likes {
      id
      user {
        username
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticleGQL extends Apollo.Query<GetArticleQuery, GetArticleQueryVariables> {
    override document = GetArticleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CommentArticleDocument = gql`
    mutation CommentArticle($articleId: ID!, $content: String!) {
  commentArticle(articleId: $articleId, content: $content) {
    success
    message
    comment {
      id
      content
      author {
        id
        username
      }
      article {
        id
        title
        author {
          id
          username
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CommentArticleGQL extends Apollo.Mutation<CommentArticleMutation, CommentArticleMutationVariables> {
    override document = CommentArticleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    success
    message
    user {
      id
      username
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    override document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SignInDocument = gql`
    mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    success
    message
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SignInGQL extends Apollo.Mutation<SignInMutation, SignInMutationVariables> {
    override document = SignInDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }