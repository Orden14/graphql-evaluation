import {comparePasswords, createJWT} from "../../modules/auth.js";
import {MutationResolvers} from "../../config/types.js";
import {getAuthenticationSuccessResponse, getInvalidCredentialResponse} from "../../response/AuthenticationResponse.js";
export const signIn: MutationResolvers['signIn'] = async (_, {username, password}, {dataSources}) => {
    try {
        const user = await dataSources.db.user.findFirstOrThrow({where: {username}})
        const isValidPassword = await comparePasswords(password, user.password)

        if (!isValidPassword) {
            return getInvalidCredentialResponse();
        }

        const token = createJWT(user)

        return getAuthenticationSuccessResponse(token);
    } catch {
        return getInvalidCredentialResponse()
    }
}