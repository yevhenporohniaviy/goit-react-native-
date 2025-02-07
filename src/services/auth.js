import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config";
import { addUser, getUser } from "./firebaseStore";

// Функція для реєстрації користувача
export const register = async ({ email, password, login }) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credentials.user;
    const userData = {
      uid: user.uid,
      email: user.email || "",
      displayName: login || "",
    };

    await addUser(user.uid, userData);

    return userData;
  } catch (error) {
    console.log("Signup error:", error);
    throw error;
  }
};

// Функція для логіну користувача та збереження його в Redux
export const login = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;
    return await getUser(user.uid);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Функція для логауту
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Оновлення профілю користувача
export const updateUserProfile = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
