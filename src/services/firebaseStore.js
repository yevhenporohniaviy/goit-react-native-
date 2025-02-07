import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db, storage } from "../../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Функція для додавання документа до колекції
export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
    console.log("User added:", userId);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const addPost = async (post) => {
  try {
    await setDoc(doc(db, "posts", post.id), post, {
      merge: true,
    });
    console.log("Post added:", post);
    return post;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

// Функція для отримання документа з колекції
export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const getPosts = async (uid) => {
  const docRef = collection(db, "posts");
  const q = query(docRef, where("userId", "==", uid), limit(10));
  const docSnap = await getDocs(q);

  if (docSnap.size > 0) {
    const posts = [];
    docSnap.forEach((doc) => {
      posts.push(doc.data());
    });
    return posts;
  } else {
    console.log("No such document!");
    return null;
  }
};

export const getPostById = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getCommentsByPostId = async (id) => {
  const docRef = collection(db, "comments");
  const q = query(docRef, where("postId", "==", id));
  const docSnap = await getDocs(q);
  if (docSnap.size > 0) {
    const comments = [];
    docSnap.forEach((doc) => {
      comments.push(doc.data());
    });
    return comments;
  }
  return [];
};

export const addComment = async (comment) => {
  try {
    console.log("comment", comment);
    await setDoc(doc(db, "comments", comment.id), comment, {
      merge: true,
    });
    console.log("Comment added:", comment);
    return comment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Функція для запису даних користувача у Firestore
export const updateUserInFirestore = async (uid, data) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true }); // merge: true - для оновлення існуючого документа або створення нового
    console.log("User data updated to Firestore:", uid);
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};

// Функція для завантаження зображення
export const uploadImage = async (
  userId,
  file,
  fileName,
  dbPrefix = "postPhotos"
) => {
  try {
    const imageRef = ref(storage, `${dbPrefix}/${userId}/${fileName}`);
    const result = await uploadBytes(imageRef, file);
    return await getImageUrl(result.ref);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Функція для отримання URL завантаженого зображення
export const getImageUrl = async (imageRef) => {
  const url = await getDownloadURL(imageRef);
  return url;
};
