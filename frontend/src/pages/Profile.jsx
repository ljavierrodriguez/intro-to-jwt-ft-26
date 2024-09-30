import React, { useContext, useEffect } from 'react'
import { Context } from '../store/AppContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const state = useContext(Context)

    useEffect(() => {
        state?.actions?.profile(state?.store?.access_token)
    }, [state?.store?.access_token])

    useEffect(() => {
        if (state?.store?.access_token === null) navigate('/login')
    }, [state])

    return (
        <>
            <h3>Profile</h3>
            <p>Id: {state?.store?.profile?.id}</p>
            <p>Email: {state?.store?.profile?.email}</p>
        </>
    )
}

export default Profile