import React from "react";

const AuthContext = React.createContext();

export function useAuthContext() {
    return React.useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = React.useState(false)

    React.useEffect(() => {
        const token = localStorage.getItem('transport_token')
        if (token && token!== '') {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [setIsLogin])

    const value = {
        isLogin,
        setIsLogin,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}