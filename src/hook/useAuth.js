import { onAuthStateChanged, getAuth } from "firebase/auth"
import { useState, useEffect } from 'react';

const UseAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth();
    useEffect(() => {
        if (!auth) {
          console.error('Firebase auth is not initialized');
          return;
        }
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user);
          } else {
            setCurrentUser(null);
          }
        });
    
        return () => unsubscribe();
      }, [auth]);

    return currentUser;
}

export default UseAuth;
