import {MutationResolvers} from "../../config/types.js";
import {hashPassword} from "../../modules/auth.js";

export const createUser: MutationResolvers['createUser'] = async (_, {username, password}, context) => {
    try {
        const createdUser = await context.dataSources.db.user.create({
            data: {
                username,
                password: await hashPassword(password)
            }
        })

        return {
            code: 201,
            message: `User ${username} has been created`,
            success: true,
            user: {
                id: createdUser.id,
                username: createdUser.username
            }
        }
    } catch {
        return {
            code: 400,
            message: 'User could not be created',
            success: false,
            user: null
        }
    }
}
