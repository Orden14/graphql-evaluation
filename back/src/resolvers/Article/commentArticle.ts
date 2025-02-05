import {MutationResolvers} from "../../config/types.js";
import {getUserNotAuthenticatedResponse} from "../../response/AuthenticationResponse.js";
import {getCommentCreationFailureResponse, getCommentCreationSuccessResponse} from "../../response/CommentResponse.js";

export const commentArticle: MutationResolvers['commentArticle'] = async (_, {articleId, content}, {
    dataSources,
    user
}) => {
    if (!user) {
        return getUserNotAuthenticatedResponse()
    }

    try {
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

        return getCommentCreationSuccessResponse(comment);
    } catch {
        return getCommentCreationFailureResponse();
    }
};
