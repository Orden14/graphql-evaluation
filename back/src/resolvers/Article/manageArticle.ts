import {MutationResolvers} from "../../config/types.js";
import {
    getArticleManagementFailureResponse,
    getArticleDeletionSuccessResponse,
    getArticleManagementSuccessResponse
} from "../../response/ArticleResponse.js";
import {getUserNotAuthenticatedResponse} from "../../response/AuthenticationResponse.js";

export const createArticle: MutationResolvers['createArticle'] = async (_, {title, content}, {dataSources, user}) => {
    if (!user) {
        return getUserNotAuthenticatedResponse();
    }

    try {
        const article = await dataSources.db.article.create({
            data: {
                title,
                content,
                authorId: user.id
            },
            include: {
                author: true
            }
        });

        return getArticleManagementSuccessResponse(article, 'Article created successfully');
    } catch {
        return getArticleManagementFailureResponse('Article could not be created');
    }
};

export const updateArticle: MutationResolvers['updateArticle'] = async (_, {id, title, content}, {
    dataSources,
    user
}) => {
    if (!user) {
        return getUserNotAuthenticatedResponse();
    }

    try {
        const article = await dataSources.db.article.update({
            where: {id},
            data: {
                title: title ?? undefined,
                content: content ?? undefined
            },
            include: {author: true}
        });

        return getArticleManagementSuccessResponse(article, 'Article updated successfully');
    } catch {
        return getArticleManagementFailureResponse('Article could not be updated');
    }
};

export const deleteArticle: MutationResolvers['deleteArticle'] = async (_, {id}, {dataSources, user}) => {
    if (!user) {
        throw new Error('Not authenticated');
    }

    try {
        await dataSources.db.like.deleteMany({where: {articleId: id}});
        await dataSources.db.comment.deleteMany({where: {articleId: id}});
        await dataSources.db.article.delete({where: {id}});

        return getArticleDeletionSuccessResponse();
    } catch {
        return getArticleManagementFailureResponse('Error while deleting the article');
    }
};
