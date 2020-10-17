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
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" value={ username } onChange={ e => setusername(e.target.value)} />
                {onLogIn()}
                <label htmlFor="password_confirmation">Password Confirmation:</label>
                <input type="password" name="password_confirmation" id="password_confirmation" value={ password_confirmation } onChange={ e => setpassword_confirmation(e.target.value)} />
                </div>
            )
        } else {
            return onLogIn()
        }
    }

    const onLogIn = () => {
        return (
            <div>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="email" value={ email } onChange={ e => setemail(e.target.value)} />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={ password } onChange={ e => setpassword(e.target.value)} />
            </div>
        )
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <div>{props.errors ? props.errors : null}</div>
            {onSignUp()}
            <input type="submit" value={ props.onSignUp? "Signup" : "Login"} />
        </form>
    )
    
}

export default LoginForm