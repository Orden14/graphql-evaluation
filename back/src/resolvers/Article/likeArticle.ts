import {MutationResolvers} from "../../config/types.js";

export const likeArticle: MutationResolvers['likeArticle'] = async (_, { id }, { dataSources, user }) => {
    if (!user) {
        throw new Error('Not authenticated');
    }

    const like = await dataSources.db.like.create({
        data: {
            userId: user.id,
            articleId: id
        },
        include: {
            article: {
                include: {
                    author: true
                }
            },
            user: true
        }
    });

    return {
        code: 200,
        success: true,
        message: 'Article liked successfully',
        like
    };
};
