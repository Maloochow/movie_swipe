function userReducer(state = [], action) {
    switch (action.type) {
        case "USER_LOGIN":
            return [...state, action.user]
            break;
    
        default:
            return state
            break;
    }
}

export default userReducer