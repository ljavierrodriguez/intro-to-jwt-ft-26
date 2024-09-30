import React, { useContext, useEffect } from 'react'
import { Context } from '../store/AppContext'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const state = useContext(Context)

    useEffect(() => {
        if (state?.store?.access_token === null) navigate('/login')
    }, [state])

    return (
        <>
        <div>Bienvenido, {state?.store?.user?.email || 'Anonimous'} <Link to="/profile">Ver Profile</Link></div>
        <button onClick={state.actions.logout}>Logout</button>
        </>
    )
}

export default Home