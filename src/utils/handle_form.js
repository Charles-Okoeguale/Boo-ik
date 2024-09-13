import { auth, provider } from "../firebase";
import { handleAuthSuccess } from "./handle_others";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";

export async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      await handleAuthSuccess(result.user);
    } catch (error) {
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
      console.error("Error during sign-up:", error);
    }
  }

  export const sendResetEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent successfully!");
    } catch (error) {
        console.error("Error sending password reset email:", error.message);
    }
};