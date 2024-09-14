import { auth, provider } from "../firebase";
import { deleteCookie, getErrorMessage, handleAuthSuccess } from "./handle_others";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { signOut } from 'firebase/auth';

export async function signInWithGoogle() {
  try {
      const result = await signInWithPopup(auth, provider);
      await handleAuthSuccess(result.user);
  } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      toast.error(errorMessage);
      console.error("Error during Google sign-in:", error);
  }
}

export async function signUpWithEmailAndPassword(email, password, setEmail, setPassword) {
  try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await handleAuthSuccess(userCredential.user);
      setEmail('');
      setPassword('');
  } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      toast.error(errorMessage);
      console.error("Error during sign-up:", error);
  }
}

export const sendResetEmail = async (email) => {
  try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully!");
  } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      toast.error(errorMessage);
      console.error("Error sending password reset email:", error.message);
  }
};

export const logout = async () => {
  try {
      await signOut(auth)
      deleteCookie('boo-ik_token');
  } catch (error) {
      
  }
}

export const handleFileChange = (event, setSelectedFile) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedFile(file);
  }
};

export const handleIconClick = () => {
  document.getElementById('fileInput').click();
};

