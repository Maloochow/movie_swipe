function userReducer(state = {username: "", email: "", loading: false, errors: []}, action) {
    switch (action.type) {
        case "USER_LOGIN":
            return {...state, username: action.user.username, email: action.user.email, loading: false, errors: []}
            break;
        case "USER_LOAD":
            return {...state, loading: true, errors: []}
            break;
        case "USER_LOGOUT":
            return {...state, username: "", email: "", loading: false, errors: []}
            break;
        case "USER_ERRORS":
            return {...state, errors: action.errors}
            break;
        default:
            return state
            break;
    }
}

export default userReducer