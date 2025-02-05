import {MutationResolvers} from "../../config/types.js";

export const commentArticle: MutationResolvers['commentArticle'] = async (_, { articleId, content }, { dataSources, user }) => {
    if (!user) {
        throw new Error('Not authenticated');
    }

    const comment = await dataSources.db.comment.create({
        data: {
            content,
            authorId: user.id,
            articleId
        },
        include: {
            article: {
                include: {
                    author: true
                }
            },
            author: true
        }
    });

    return {
        code: 201,
        success: true,
        message: 'Comment added successfully',
        comment
    };
};
