import {MutationResolvers} from "../../config/types.js";
import {hashPassword} from "../../modules/auth.js";
import {getUserCreationErrorResponse, getUserCreationSuccessResponse} from "../../response/UserResponse.js";

export const createUser: MutationResolvers['createUser'] = async (_, {username, password}, context) => {
    try {
        const createdUser = await context.dataSources.db.user.create({
            data: {
                username,
                password: await hashPassword(password)
            }
        })

        return getUserCreationSuccessResponse(createdUser)
    } catch {
        return getUserCreationErrorResponse()
    }
}
