import {MutationResolvers} from "../../config/types.js";
import {
    getArticleLikedResponse,
    getArticleLikeFailureResponse,
    getArticleLikeRemovalResponse
} from "../../response/LikeResponse.js";
import {getUserNotAuthenticatedResponse} from "../../response/AuthenticationResponse.js";

export const likeArticle: MutationResolvers['likeArticle'] = async (_, {id}, {dataSources, user}) => {
    if (!user) {
        return getUserNotAuthenticatedResponse();
    }

    try {
        const existingLike = await dataSources.db.like.findFirst({
            where: {
                userId: user.id,
                articleId: id
            }
        });

        if (existingLike) {
            return getArticleLikeFailureResponse("Authenticated user already like this article");
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

        return getArticleLikedResponse(like);
    } catch {
        return getArticleLikeFailureResponse("Error while liking article");
    }
};

export const removeLike: MutationResolvers['removeLike'] = async (_, {id}, {dataSources, user}) => {
    if (!user) {
        return getUserNotAuthenticatedResponse();
    }

    try {

        const like = await dataSources.db.like.findUnique({
            where: {
                id
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

        if (!like) {
            return getArticleLikeFailureResponse('Like not found');
        }

        if (like.userId !== user.id) {
            return getArticleLikeFailureResponse('Authenticated user is not the owner of this like');
        }

        await dataSources.db.like.delete({
            where: {
                id
            }
        });

        return getArticleLikeRemovalResponse();
    } catch {
        return getArticleLikeFailureResponse("Error while removing like");
    }
};
