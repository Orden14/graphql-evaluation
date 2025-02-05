import {Article} from "../config/types.js";

export const getArticleManagementSuccessResponse = (article: Article, message: string = 'Article managed successfully') => {
    return {
        code: 200,
        success: true,
        message: message,
        article
    };
}

export const getArticleDeletionSuccessResponse = () => {
    return {
        code: 200,
        success: true,
        message: 'Article deleted successfully'
    };
}

export const getArticleManagementFailureResponse = (message: string) => {
    return {
        code: 400,
        success: false,
        message: message,
        article: null
    }
}