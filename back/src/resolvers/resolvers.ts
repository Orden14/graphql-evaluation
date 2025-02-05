import {Resolvers} from "../config/types.js";
import {createUser} from "./User/createUser.js";
import {signIn} from "./User/signIn.js";

export const resolvers: Resolvers = {
    Mutation: {
        createUser,
        signIn
    },
}
