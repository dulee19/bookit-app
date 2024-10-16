'use client'
import { AuthProvider } from "@/context/authContext"

const AuthWraper = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default AuthWraper