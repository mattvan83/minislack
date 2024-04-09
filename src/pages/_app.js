import "@/styles/globals.css";
import "sanitize.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { firebaseConfig } from "@/firebase/config";
import { FirebaseContext } from "@/firebase/FirebaseContext";

const googleProvider = new GoogleAuthProvider();

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAuth(getAuth(app));
  }, []);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        console.log("Auth listener:\n", authUser);
        setUser(authUser);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  const signin = async () => await signInWithPopup(auth, googleProvider);

  const signout = async () => await signOut(auth);

  return (
    <FirebaseContext.Provider value={{ signin, user, signout }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
