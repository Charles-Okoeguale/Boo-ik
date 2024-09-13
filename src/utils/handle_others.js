import { setCookie } from "./handle_storage";

export const handleAuthSuccess = async (user) => {
    const idToken = await user.getIdToken(); 
    setCookie('boo-ik_token', idToken, 3);
};

export const deleteCookie = (name) => {
    document.cookie = `${name}=; path=/;`;
};

export const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Invalid email format.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/user-not-found':
            return 'No user found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/email-already-in-use':
            return 'This email is already in use. Please use a different email.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters long.';
        default:
            return 'An error occurred. Please try again later.';
    }
};

export function getCookieValue(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            const cookieValue = cookie.substring(name.length, cookie.length); 
            return cookieValue || null; 
        }
    }
    return null; 
}

export function isCookieExists(cookieName) {
    const value = getCookieValue(cookieName);
    return value !== null && value !== '';
}