import { auth, provider } from "../firebase";
import { getErrorMessage, handleAuthSuccess } from "./handle_others";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

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