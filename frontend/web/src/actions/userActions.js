import axios from 'axios'

const rootURL = 'http://localhost:3001/'

export const userLogin = (user) => {
    return (dispatch) => {
        dispatch({type: 'USER_LOAD'})
        axios.post(rootURL + 'login', user, {withCredentials: true})
            .then(response => {
                if (response.data.logged_in) {
                    dispatch({type: 'USER_LOGIN', user: response.data.user})
                } else {
                    dispatch({type: 'USER_ERRORS', errors: response.data.errors})
                }
            })
            .catch(error => console.error(error))
    }
}

export const userSignUp = (user) => {
    return (dispatch) => {
        dispatch({type: 'USER_LOAD'})
        axios.post(rootURL + 'users', user, {withCredentials: true})
        .then(response => {
            console.log(response)
            if (response.data.logged_in) {
                dispatch({type: 'USER_LOGIN', user: response.data.user})
            } else {
                dispatch({type: 'USER_ERRORS', errors: response.data.errors})
            }
        })
        .catch(error => console.error(error))
    }
}

export const userLogOut = () => {
    return (dispatch) => {
        dispatch({type: 'USER_LOAD'})
        axios.post(rootURL + 'logout', {withCredentials: true})
            .then(response => {
                console.log(response)
                if (response.data.logged_out) {
                    dispatch({type: 'USER_LOGOUT'})
                }
            })
            .catch(error => console.error(error))
    }
}

export const isLoggedIn = () => {
    return (dispatch) => {
        dispatch({type: 'USER_LOAD'})
        axios.get(rootURL + 'logged_in', {withCredentials: true})
            .then(response => {
                if (response.data.logged_in) {
                    console.log(response)
                    dispatch({type: 'USER_LOGIN', user: response.data.user})
                } else {
                    console.log(response)
                    dispatch({type: 'USER_LOGOUT' })
                }
            })
            .catch(error => console.error(error))
    }
}
