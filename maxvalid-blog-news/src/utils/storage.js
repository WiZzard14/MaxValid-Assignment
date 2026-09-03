import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { blogPosts as initialPosts } from "../data/mockData";

export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    if (querySnapshot.empty) {
      let time = Date.now() - 1000000;
      for (const post of initialPosts) {
        await addDoc(collection(db, "posts"), { ...post, createdAt: time });
        time += 1000;
      }
      const refetched = await getDocs(collection(db, "posts"));
      const posts = refetched.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      return posts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }
    const posts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return posts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (error) {
    console.error("Error fetching posts", error);
    return initialPosts; 
  }
};

export const addPost = async (post) => {
  try {
    const postWithTime = { ...post, createdAt: Date.now() };
    const docRef = await addDoc(collection(db, "posts"), postWithTime);
    return { ...postWithTime, id: docRef.id };
  } catch (error) {
    console.error("Error adding post", error);
    throw error;
  }
};

export const updatePost = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, "posts", id), updatedData);
  } catch (error) {
    console.error("Error updating post", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    await deleteDoc(doc(db, "posts", id));
  } catch (error) {
    console.error("Error deleting post", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return users.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};

export const addUser = async (user) => {
  try {
    const userWithTime = { ...user, createdAt: Date.now() };
    const docRef = await addDoc(collection(db, "users"), userWithTime);
    return { ...userWithTime, id: docRef.id };
  } catch (error) {
    console.error("Error adding user", error);
    throw error;
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, "users", id), updatedData);
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, "users", id));
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};
