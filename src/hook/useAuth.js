import { onAuthStateChanged, getAuth } from "firebase/auth"
import { useState, useEffect } from 'react';

const UseAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
      });

      return () => unsubscribe();
  }, [auth]);

  return { currentUser, loading };
}

export default UseAuth;
