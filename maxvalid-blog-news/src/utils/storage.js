import { blogPosts as initialPosts } from "../data/mockData";

export const getPosts = () => {
  const stored = localStorage.getItem("maxvalid_posts");
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.length === 16 && parsed[0].category === "Blood Donation") return parsed;
  }
  localStorage.setItem("maxvalid_posts", JSON.stringify(initialPosts));
  return initialPosts;
};

export const addPost = (post) => {
  const posts = getPosts();
  const newPost = {
    ...post,
    id: Date.now(),
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };
  const updatedPosts = [newPost, ...posts];
  localStorage.setItem("maxvalid_posts", JSON.stringify(updatedPosts));
  return updatedPosts;
};

export const deletePost = (id) => {
  const posts = getPosts();
  const updatedPosts = posts.filter(post => post.id !== id);
  localStorage.setItem("maxvalid_posts", JSON.stringify(updatedPosts));
  return updatedPosts;
};
