import {Comment} from "../config/types.js";

export const getCommentCreationSuccessResponse = (comment: Comment) => {
    return {
        code: 200,
        success: true,
        message: 'Comment added successfully',
        comment
    };
}

export const getCommentCreationFailureResponse = () => {
    return {
        code: 400,
        success: false,
        message: 'Comment could not be added'
    };
}
