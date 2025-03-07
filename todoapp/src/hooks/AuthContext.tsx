import { useEffect, createContext, useContext, useState, ReactNode } from "react"

interface AuthContextType {
    token: string | null
    login: (newToken: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => {
        return sessionStorage.getItem("token") || null
    })

    useEffect(() => {
        if (token) {
            sessionStorage.setItem("token", token)
        } else {
            sessionStorage.removeItem("token")
        }
    }, [token])

    const login = (newToken: string) => {
        setToken(newToken)
        sessionStorage.setItem("token", newToken)
    }

    const logout = () => {
        setToken(null)
        sessionStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
