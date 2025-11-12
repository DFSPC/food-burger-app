import React, { createContext, useContext, ReactNode } from "react";
import { User } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { EMPTY_USER } from "../common/consts";

interface AuthContextType {
    user: User;
    setUser: (user: User | ((val: User) => User)) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [user, setUser] = useLocalStorage<User>("userValues", EMPTY_USER);

    const logout = () => {
        setUser(EMPTY_USER);
        window.location.href = "/login";
    };

    const isAuthenticated = !!user.token;

    return (
        <AuthContext.Provider
            value={{ user, setUser, logout, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
