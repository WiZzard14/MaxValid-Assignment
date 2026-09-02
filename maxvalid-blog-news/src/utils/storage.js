import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { blogPosts as initialPosts } from "../data/mockData";

export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    if (querySnapshot.empty) {
      // Seed the database if empty
      for (const post of initialPosts) {
        await addDoc(collection(db, "posts"), post);
      }
      const refetched = await getDocs(collection(db, "posts"));
      return refetched.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching posts", error);
    return initialPosts; // fallback
  }
};

export const addPost = async (post) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), post);
    return { ...post, id: docRef.id };
  } catch (error) {
    console.error("Error adding post", error);
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
