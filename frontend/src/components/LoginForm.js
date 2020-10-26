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
        props.history.push("/")
    }

    const onSignUp = () => {
        if(props.onSignUp) {
            return (
                <div>
                    <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" value={ username } onChange={ e => setusername(e.target.value)}/>
                    </div>
                
                {onLogIn()}

                    <div class="form-group">
                    <label for="password_confirmation">Password Confirmation</label>
                    <input type="password" class="form-control" id="password_confirmation" value={ password_confirmation } onChange={ e => setpassword_confirmation(e.target.value)} />
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
                <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" value={ email } onChange={ e => setemail(e.target.value)}/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" value={ password } onChange={ e => setpassword(e.target.value)}/>
                </div>
            </div>
        )
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <div>{props.errors ? props.errors : null}</div>
            {onSignUp()}
            <button type="submit" class="btn btn-primary">{ props.onSignUp? "Signup" : "Login"}</button>
        </form>
    )
    
}

export default LoginForm