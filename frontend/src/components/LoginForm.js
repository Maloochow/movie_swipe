import React, { useState } from 'react'

const LoginForm = (props) => {
    const [username, setusername] = useState(props.user.username)
    const [email, setemail] = useState(props.user.email)
    const [password, setpassword] = useState("")
    const [password_confirmation, setpassword_confirmation] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const userParams = { 
            user: {username, email, password, password_confirmation}
        }
        if (props.onSignUp) {
            props.userSignUp(userParams)
        } else {
            props.userLogin(userParams)
        }
        setusername("")
        setemail("")
        setpassword("")
        setpassword_confirmation("")
        // props.history.push("/")
    }

    const showError = (err) => {
        return (
            <div>
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-exclamation-circle-fill text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
                &nbsp;&nbsp;
                {err}
                <p></p>
            </div>
        )
    }
    
    const showErrors = () => {
        return props.user.errors.map( (err, index) => <div key={index}>{showError(err)}</div>)
    }

    const isValidate = () => {
        if(props.onSignUp) {
            if (username !== "" && email !== "" && password_confirmation === password && password !== "") {
                return true
            } else {
                return false
            }
        } else if (email !== "" && password !== "") {
            return true
        } else {
            return false
        }
    }
    

    const onSignUp = () => {
        if(props.onSignUp) {
            return (
                <div>
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input required type="text" className="form-control" id="username" value={ username } onChange={ e => setusername(e.target.value)}/>
                    <small id="emailHelp" className="form-text text-muted">At least 4 characters.</small>
                    </div>
                
                {onLogIn()}

                    <div className="form-group">
                    <label htmlFor="password_confirmation">Password Confirmation</label>
                    <input required type="password" className="form-control" id="password_confirmation" value={ password_confirmation } onChange={ e => setpassword_confirmation(e.target.value)} />
                    <div class="invalid-tooltip">
                        Should be the same with password
                    </div>
                    </div>
                </div>
            )
        } else {
            return onLogIn()
        }
    }

    const onLogIn = () => {
        return (
            <div>
                <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input required type="email" className="form-control" id="email" aria-describedby="emailHelp" value={ email } onChange={ e => setemail(e.target.value)}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input required type="password" className="form-control" id="password" value={ password } onChange={ e => setpassword(e.target.value)}/>
                </div>
            </div>
        )
    }
    
    return(
        <form onSubmit={handleSubmit} className="needs-validation" id="loginForm">
            {showErrors()}
            <div>{props.errors ? props.errors : null}</div>
            {onSignUp()}
            <button disable={!isValidate()} type="submit" className="btn btn-primary">{ props.onSignUp? "Signup" : "Login"}</button>
        </form>
    )
    
}

export default LoginForm