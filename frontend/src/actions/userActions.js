import axios from 'axios'

axios.defaults.xsrfCookieName = "CSRF-TOKEN";

axios.defaults.xsrfHeaderName = "X-CSRF-Token";

axios.defaults.withCredentials = true;

const rootURL = 'http://localhost:8080/'

export const userLogin = (user) => {
    return (dispatch) => {
        dispatch({type: 'USER_LOAD'})
        axios.post(rootURL + 'login', user )
            .then(response => {
                console.log(response)
                if (response.data.logged_in) {
                    dispatch({type: 'USER_LOGIN', user: response.data.user})
                } else {
                    dispatch({type: 'USER_ERRORS', errors: [response.data.errors]})
                }
            })
            .catch(error => console.error(error))
    }
}

export const userSignUp = (user) => {
    return (dispatch) => {
        dispatch({type: 'USER_LOAD'})
        axios.post(rootURL + 'users', user )
        .then(response => {
            console.log(response)
            if (response.data.logged_in) {
                dispatch({type: 'USER_LOGIN', user: response.data.user})
            } else {
                dispatch({type: 'USER_ERRORS', errors: response.data.errors})
            }
            return response.data.errors
        })
        .catch(error => console.error(error))
    }
}

export const userLogOut = () => {
    return (dispatch) => {
        dispatch({type: 'USER_LOAD'})
        axios.post(rootURL + 'logout' )
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
        axios.get(rootURL + 'logged_in' )
            .then(response => {
                console.log(response.data)
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
