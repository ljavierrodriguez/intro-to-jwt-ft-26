import { createContext, useEffect, useState } from "react";


export const Context = createContext(null)

const GlobalContext = ({ children }) => {
    const [store, setStore] = useState({
        user: null,
        access_token: null,
        profile: null
    })

    const [actions] = useState({
        checkCurrentUser: () => {
            if(sessionStorage.getItem('access_token')){

                const user = JSON.parse(sessionStorage.getItem('user'))
                const access_token = sessionStorage.getItem('access_token')

                setStore((store) => ({ ...store, user, access_token }))
            }
        },
        login: async (credentials) => {
            try {

                const response = await fetch('http://127.0.0.1:5000/api/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const responseJson = await response.json()

                if(responseJson.status === 'success'){
                    const { user, access_token } = responseJson

                    setStore((store) => ({ ...store, user, access_token }))
                    sessionStorage.setItem('access_token', access_token)
                    sessionStorage.setItem('user', JSON.stringify(user))

                    return true
                } else {
                    return false
                }

            } catch (error) {
                console.log(error.message)
            }
        },
        logout: () => {
            setStore((store) => ({ ...store, user: null, access_token: null }))
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('access_token')
        },
        profile: async (access_token) => {
            try {
                console.log(access_token)
                const response = await fetch('http://127.0.0.1:5000/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    }
                })

                const responseJson = await response.json()

                setStore((store) => ({...store, profile: responseJson?.user }))

            } catch (error) {
                console.log(error.message)
            }

        }
    })

    useEffect(() => {
        actions.checkCurrentUser()
    }, [])

    return (
        <Context.Provider value={{ store, actions }}>
            {children}
        </Context.Provider>
    )
}

export default GlobalContext