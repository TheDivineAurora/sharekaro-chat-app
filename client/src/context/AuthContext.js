"use client";
import AuthReducer from './AuthReducer'
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    user: {
        "_id": "65b4a6b036575cef5b5b1484",
        "name": "karthikkarthikkarthik",
        "email": "karthikkarthikkarthik@gmail.com",
        "username": "karthikkarthikkarthik",
        "profileImage": "/pfp.webp",
        "coverPicture": "",
        "followers": [],
        "followings": [],
        "posts": [
            "65b487809f4026184b6bac39"  
        ],
        "isAdmin": false,
        "description": "",
        "createdAt": "2024-01-27T06:46:08.986Z",
        "__v": 0
    },
    isFetching: false,
    error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
