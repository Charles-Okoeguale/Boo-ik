import { setCookie } from "./handle_storage";

export const handleAuthSuccess = async (user) => {
    const idToken = await user.getIdToken(); 
    setCookie('boo-ik_token', idToken, 3);
};

export const deleteCookie = (name) => {
    document.cookie = `${name}=; path=/;`;
};