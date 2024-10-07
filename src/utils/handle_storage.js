import { getAuth } from "firebase/auth"

export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
      try {
          return await user.getIdToken();
      } catch (error) {
          console.error("Error getting token:", error);
          return null;
      }
  } else {
      return null;
  }
};


export const getUserToken = async () => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('User is not authenticated');
  
  return await user.getIdToken();
};

