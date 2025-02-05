import {QueryResolvers} from "../../config/types.js";

export const getArticle: QueryResolvers['getArticle'] = async (_, { id }, context) => {
    return context.dataSources.db.article.findUnique({
        where: {id},
        include: {
            author: true
        }
    });
};

export const getArticles: QueryResolvers['getArticles'] = async (_, __, context) => {
    return context.dataSources.db.article.findMany({
        include: {
            author: true
        }
    });
};
