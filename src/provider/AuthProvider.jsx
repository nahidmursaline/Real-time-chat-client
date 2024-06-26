import React from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { useState } from 'react';
import { useEffect } from 'react';
import { app } from '../Firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password)=> {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email,password)
    }


    const logOut = ()=> {
        setLoading(true);
        return signOut(auth);
    }

    const profileUpdate = (profile) => {
        return updateProfile(auth.currentUser, profile);
      }
      



    useEffect(()=> {
       const unsubscribe= onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser)
            setLoading(false);
        });
        return ()=> {
            return unsubscribe();
        }
    },[])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn, 
        logOut,
        profileUpdate
    }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;