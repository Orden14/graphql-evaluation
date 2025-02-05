import {MutationResolvers} from "../../config/types.js";

export const createArticle: MutationResolvers['createArticle'] = async (_, { title, content }, { dataSources, user }) => {
    if (!user) {
        throw new Error('Not authenticated');
    }

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

    return {
        code: 201,
        success: true,
        message: 'Article created successfully',
        article
    };
};

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { id, title, content }, { dataSources, user }) => {
    if (!user) {
        throw new Error('Not authenticated');
    }

    const article = await dataSources.db.article.update({
        where: { id },
        data: {
            title: title ?? undefined,
            content: content ?? undefined },
        include: { author: true }
    });

    return {
        code: 200,
        success: true,
        message: 'Article updated successfully',
        article
    };
};

export const deleteArticle: MutationResolvers['deleteArticle'] = async (_, { id }, { dataSources, user }) => {
    if (!user) {
        throw new Error('Not authenticated');
    }

    await dataSources.db.article.delete({ where: { id } });

    return {
        code: 200,
        success: true,
        message: 'Article deleted successfully'
    };
};