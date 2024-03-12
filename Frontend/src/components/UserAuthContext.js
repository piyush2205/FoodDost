import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../components/firebase";

const userAuthContext = createContext();

export function useUserAuth() {
    return useContext(userAuthContext);
}

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("Auth", currentuser);
            setUser(currentuser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <userAuthContext.Provider
            value={{ user, logIn, signUp, logOut, googleSignIn }}
        >
            {children}
        </userAuthContext.Provider>
    );
}

function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}
function logOut() {
    return signOut(auth);
}
function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
}

