import {Like} from "../config/types.js";

export const getArticleLikedResponse = (like: Like) => {
    return {
        code: 200,
        success: true,
        message: 'Article liked successfully',
        like
    };
}

export const getArticleLikeRemovalResponse = () => {
    return {
        code: 200,
        success: true,
        message: 'Like removed successfully'
    };
}

export const getArticleLikeFailureResponse = (message: string) => {
    return {
        code: 400,
        success: false,
        message
    };
}
