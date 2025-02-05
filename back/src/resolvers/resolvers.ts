import {Resolvers} from "../config/types.js";
import {createUser} from "./User/createUser.js";
import {signIn} from "./User/signIn.js";
import {getArticle, getArticles} from "./Article/getArticle.js";
import {createArticle, updateArticle, deleteArticle} from "./Article/manageArticle.js";
import {commentArticle} from "./Article/commentArticle.js";
import {likeArticle} from "./Article/likeArticle.js";

export const resolvers: Resolvers = {
    Query: {
        getArticles,
        getArticle
    },
    Mutation: {
        createUser,
        signIn,
        createArticle,
        updateArticle,
        deleteArticle,
        commentArticle,
        likeArticle
    },
}
