const API_URL = "http://localhost:5000/api/posts";

export async function getPosts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getPost(slug) {
  const res = await fetch(`${API_URL}/${slug}`);
  return res.json();
}
