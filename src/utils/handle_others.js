import { setCookie } from "./handle_storage";
import axios from 'axios';
import { getAuth } from 'firebase/auth';

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

export const handleAnalyzePdf = async (selectedFile, setLoading, setAnalysed, toast) => {
    if (!selectedFile) {
        console.log('You need to upload a pdf file');
        return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'vpwyqduo');
    try {
        const uploadResponse = await axios.post(
            'https://api.cloudinary.com/v1_1/dcm42p2eg/upload',
            formData
        );

        const pdfUrl = uploadResponse.data.secure_url;
        const user = getAuth().currentUser;
        if (!user) {
            throw new Error('User is not authenticated');
        }
        const idToken = user.accessToken;
        await axios.post('http://localhost:5000/api/process-pdf', {
            pdfUrl: pdfUrl,
            idToken: idToken
        });
        localStorage.setItem('pdfUrl', pdfUrl);
        toast.success('PDF processed successfully!');
        setAnalysed(true);
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response);
            toast.error(`Error: ${error.response.data.message || 'Failed to upload or process PDF'}`);
        } else if (error.request) {
            console.error('Error request:', error.request);
            toast.error('Error: No response from the server.');
        } else {
            console.error('Error message:', error.message);
            toast.error(`Error: ${error.message}`);
        }
    } finally {
        setLoading(false);
    }
};
