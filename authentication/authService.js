import { auth } from '../firebaseConfig'; // Adjust the path if necessary
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

export const sendOtp = async (phoneNumber) => {
    try {
        const confirmationResult = await auth.signInWithPhoneNumber(auth, phoneNumber);
        return confirmationResult;
    } catch (error) {
        console.error("Error sending OTP", error);
        throw error;
    }
};

export const verifyOtp = async (confirmationResult, otpCode) => {
    try {
        const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, otpCode);
        await signInWithCredential(auth, credential);
        console.log("User signed in successfully");
    } catch (error) {
        console.error("Error verifying OTP", error);
        throw error;
    }
};
