import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCADHiUv_wT7FnVOLfv2Iensl3y9Ojwl0A",
  authDomain: "recipehub-142f4.firebaseapp.com",
  projectId: "recipehub-142f4",
  storageBucket: "recipehub-142f4.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearDB() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  console.log(`Found ${querySnapshot.size} posts. Deleting...`);
  for (const document of querySnapshot.docs) {
    await deleteDoc(doc(db, "posts", document.id));
  }
  console.log("Done!");
  process.exit(0);
}
clearDB();
