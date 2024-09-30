import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../store/AppContext'

const reducer = (state, action) => {
    switch (action.type) {
        case 'email':
            return {...state, email: action.value }
        case 'password':
            return {...state, password: action.value}
        default:
            return state
    }
}

const Login = () => {

    const navigate = useNavigate()
    const state = useContext(Context)
    

    useEffect(() => {
        if (state?.store?.access_token !== null) navigate('/')
    }, [state])
    
    const [credentials, dispatch] = useReducer(reducer, {
        email: '',
        password: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        const resp = await state.actions.login(credentials)
        if(resp) navigate('/')

    }

    return (
        <>
            <div>Login Form</div>
            <form onSubmit={handleSubmit}>
            <input type="email" name="email" id="email" placeholder='email' onChange={(e) => dispatch({ type: 'email', value: e.target.value })} />
            <input type="password" name="password" id="password" placeholder='password' onChange={(e) => dispatch({ type: 'password', value: e.target.value })} />
            <button>Login</button>
            </form>
        </>
    )
}

export default Login