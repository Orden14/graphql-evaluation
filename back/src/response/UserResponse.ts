import {User} from "../config/types.js";

export const getUserCreationSuccessResponse = (createdUser : User) => {
    return {
        code: 200,
        message: `User ${createdUser.username} has been created`,
        success: true,
        user: {
            id: createdUser.id,
            username: createdUser.username
        }
    }
}

export const getUserCreationErrorResponse = () => {
    return {
        code: 400,
        message: 'User could not be created',
        success: false,
        user: null
    }
}