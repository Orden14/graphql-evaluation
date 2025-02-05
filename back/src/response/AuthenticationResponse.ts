export const getAuthenticationSuccessResponse = (token: string) => {
    return {
        code: 200,
        message: 'User is signed in',
        success: true,
        token,
    };
}


export const getInvalidCredentialResponse = () => {
    return {
        code: 401,
        message: 'Invalid credentials',
        success: false,
        token: null
    };
}

export const getUserNotAuthenticatedResponse = () => {
    return {
        code: 400,
        success: false,
        message: 'You must be authenticated to perform this action'
    };
}
